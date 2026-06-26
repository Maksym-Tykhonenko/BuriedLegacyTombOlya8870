import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppScaffold from '../components/AppScaffold';
import {AppButton, BodyText, Eyebrow} from '../components/Primitives';
import {
  relicAssemblyLevels,
  triangleCells,
  type TrianglePiece,
} from '../data/relicAssembly';
import {getNumberValue, setNumberValue} from '../storage/storage';
import {bottomScreenInset, screenHorizontal, theme} from '../theme/theme';
import type {RootStackParamList} from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'RelicAssemblyGame'>;
type BoardFrame = {x: number; y: number; width: number; height: number};
type DragOffset = {x: number; y: number};
type DragSize = {width: number; height: number};
type DragPreview = {
  piece: TrianglePiece;
  width: number;
  height: number;
};

const triangleRows = [
  [0],
  [1, 2],
  [3, 4, 5],
  [6, 7, 8, 9],
  [10, 11, 12, 13, 14],
];

function RelicAssemblyGameScreen({navigation, route}: Props): React.JSX.Element {
  const {width} = useWindowDimensions();
  const initialLevel = Math.max(
    0,
    Math.min(relicAssemblyLevels.length - 1, (route.params?.level ?? 1) - 1),
  );
  const [levelIndex, setLevelIndex] = useState(initialLevel);
  const [placedPieceIds, setPlacedPieceIds] = useState<string[]>([]);
  const [draggingPieceId, setDraggingPieceId] = useState<string | null>(null);
  const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [message, setMessage] = useState('Drag a fragment onto the relic grid.');
  const rootRef = useRef<View>(null);
  const boardRef = useRef<View>(null);
  const rootFrameRef = useRef<BoardFrame>({x: 0, y: 0, width: 0, height: 0});
  const dragOffsetRef = useRef<DragOffset>({x: 0, y: 0});
  const dragPosition = useRef(new Animated.ValueXY()).current;
  const level = relicAssemblyLevels[levelIndex];
  const placedSet = useMemo(() => new Set(placedPieceIds), [placedPieceIds]);
  const boardComplete = placedPieceIds.length === level.pieces.length;
  const boardGap = theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8;
  const cellSize = Math.min(
    theme.layout.isTiny ? 42 : theme.layout.isCompact ? 50 : 58,
    Math.floor((width - screenHorizontal * 2 - 42) / 5),
  );

  useEffect(() => {
    const id = setInterval(() => setElapsed(value => value + 0.1), 100);
    return () => clearInterval(id);
  }, []);

  const measureRoot = () => {
    rootRef.current?.measureInWindow((x, y, rootWidth, rootHeight) => {
      rootFrameRef.current = {
        x,
        y,
        width: rootWidth,
        height: rootHeight,
      };
    });
  };

  const pieceForCell = (cellId: number) =>
    level.pieces.find(
      piece => placedSet.has(piece.id) && piece.cells.includes(cellId),
    );

  const removePiece = (piece: TrianglePiece) => {
    setPlacedPieceIds(value => value.filter(id => id !== piece.id));
    setMessage('Fragment removed. Drag it back to the relic grid.');
  };

  const pressBoardCell = (cellId: number) => {
    const placedPiece = pieceForCell(cellId);
    if (placedPiece) {
      removePiece(placedPiece);
      return;
    }
    setMessage('Drag a fragment here from the tray.');
  };

  const cellFrame = (cellId: number, frame: BoardFrame) => {
    const cell = triangleCells[cellId];
    const rowCount = cell.row + 1;
    const rowWidth = rowCount * cellSize + (rowCount - 1) * boardGap;
    const rowLeft = frame.x + (frame.width - rowWidth) / 2;
    return {
      x: rowLeft + cell.col * (cellSize + boardGap),
      y: frame.y + cell.row * (cellSize + boardGap),
      width: cellSize,
      height: cellSize,
    };
  };

  const placeDraggedPiece = (piece: TrianglePiece, x: number, y: number) => {
    if (placedSet.has(piece.id)) {
      return;
    }
    boardRef.current?.measureInWindow((left, top, boardWidth, boardHeight) => {
      const frame = {x: left, y: top, width: boardWidth, height: boardHeight};
      const boardPadding = cellSize * 0.42;
      const insideBoard =
        x >= frame.x - boardPadding &&
        x <= frame.x + frame.width + boardPadding &&
        y >= frame.y - boardPadding &&
        y <= frame.y + frame.height + boardPadding;
      const hit = piece.cells.some(cellId => {
        const rect = cellFrame(cellId, frame);
        const padding = cellSize * 0.72;
        return (
          x >= rect.x - padding &&
          x <= rect.x + rect.width + padding &&
          y >= rect.y - padding &&
          y <= rect.y + rect.height + padding
        );
      });
      if (!insideBoard || !hit) {
        setMessage('Try another spot. You can move it again.');
        return;
      }
      setPlacedPieceIds(value => [...value, piece.id]);
      const remaining = level.pieces.filter(
        item => item.id !== piece.id && !placedSet.has(item.id),
      ).length;
      setMessage(
        remaining
          ? 'Fragment placed. Tap it on the relic grid to move it again.'
          : 'Relic layout completed.',
      );
    });
  };

  const updateDragPosition = (pageX: number, pageY: number) => {
    const rootFrame = rootFrameRef.current;
    const offset = dragOffsetRef.current;
    dragPosition.setValue({
      x: pageX - rootFrame.x - offset.x,
      y: pageY - rootFrame.y - offset.y,
    });
  };

  const beginPieceDrag = (
    piece: TrianglePiece,
    pageX: number,
    pageY: number,
    offset: DragOffset,
    size: DragSize,
  ) => {
    measureRoot();
    dragOffsetRef.current = offset;
    updateDragPosition(pageX, pageY);
    setDraggingPieceId(piece.id);
    setDragPreview({piece, width: size.width, height: size.height});
  };

  const movePieceDrag = (pageX: number, pageY: number) => {
    updateDragPosition(pageX, pageY);
  };

  const endPieceDrag = (piece: TrianglePiece, pageX: number, pageY: number) => {
    placeDraggedPiece(piece, pageX, pageY);
    setDraggingPieceId(null);
    setDragPreview(null);
  };

  const cancelPieceDrag = () => {
    setDraggingPieceId(null);
    setDragPreview(null);
  };

  const resetLevel = () => {
    setPlacedPieceIds([]);
    setMessage('Drag a fragment onto the relic grid.');
  };

  const finishGame = async () => {
    const finalTime = Number(elapsed.toFixed(2));
    const previous = await getNumberValue('relicAssemblyBest');
    const isRecord = !previous || finalTime < previous;
    if (isRecord) {
      await setNumberValue('relicAssemblyBest', finalTime);
    }
    navigation.replace('RelicAssemblyResult', {
      completed: relicAssemblyLevels.length,
      total: relicAssemblyLevels.length,
      time: finalTime,
      isRecord,
    });
  };

  const nextLevel = () => {
    if (levelIndex === relicAssemblyLevels.length - 1) {
      finishGame();
      return;
    }
    setLevelIndex(value => value + 1);
    setPlacedPieceIds([]);
    setMessage('Drag a fragment onto the relic grid.');
  };

  return (
    <AppScaffold>
      <View
        ref={rootRef}
        collapsable={false}
        onLayout={measureRoot}
        style={styles.root}>
        <View style={styles.top}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Level</Text>
            <Text style={styles.metricValue}>
              {levelIndex + 1}/{relicAssemblyLevels.length}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Time</Text>
            <Text style={styles.metricValue}>{elapsed.toFixed(1)}</Text>
          </View>
          <View style={styles.topActions}>
            <AppButton
              label="Reset"
              variant="ghost"
              onPress={resetLevel}
              style={styles.smallButton}
              textStyle={styles.smallText}
            />
            <AppButton
              label="Back"
              variant="ghost"
              onPress={() => navigation.navigate('MainTabs', {tab: 'relic'})}
              style={styles.smallButton}
              textStyle={styles.smallText}
            />
          </View>
        </View>

        <ScrollView
          scrollEnabled={!draggingPieceId}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          <View style={styles.statusCard}>
            <Eyebrow>{level.title}</Eyebrow>
            <BodyText style={styles.message}>{message}</BodyText>
          </View>

          <View ref={boardRef} collapsable={false} style={styles.board}>
            {triangleRows.map((row, rowIndex) => (
              <View key={`${rowIndex}`} style={styles.boardRow}>
                {row.map(cellId => {
                  const placedPiece = pieceForCell(cellId);
                  return (
                    <Pressable
                      key={cellId}
                      onPress={() => pressBoardCell(cellId)}
                      style={[
                        styles.boardCell,
                        {width: cellSize, height: cellSize},
                        placedPiece && {
                          backgroundColor: placedPiece.color,
                          borderColor: placedPiece.color,
                        },
                      ]}
                    />
                  );
                })}
              </View>
            ))}
          </View>

          {boardComplete ? (
            <View style={styles.completeCard}>
              <Text style={styles.completeTitle}>Level Complete</Text>
              <AppButton
                label={
                  levelIndex === relicAssemblyLevels.length - 1
                    ? 'Finish'
                    : 'Next Level'
                }
                onPress={nextLevel}
              />
            </View>
          ) : (
            <View style={styles.tray}>
              {level.pieces
                .filter(piece => !placedSet.has(piece.id))
                .map(piece => (
                  <DraggablePiece
                    key={piece.id}
                    piece={piece}
                    active={draggingPieceId === piece.id}
                    onDragStart={beginPieceDrag}
                    onDragMove={movePieceDrag}
                    onDrop={endPieceDrag}
                    onDragCancel={cancelPieceDrag}
                  />
                ))}
            </View>
          )}
        </ScrollView>

        {dragPreview ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.dragLayer,
              {
                width: dragPreview.width,
                height: dragPreview.height,
                transform: dragPosition.getTranslateTransform(),
              },
            ]}>
            <PieceShape piece={dragPreview.piece} />
          </Animated.View>
        ) : null}
      </View>
    </AppScaffold>
  );
}

function DraggablePiece({
  piece,
  active,
  onDragStart,
  onDragMove,
  onDrop,
  onDragCancel,
}: {
  piece: TrianglePiece;
  active: boolean;
  onDragStart: (
    piece: TrianglePiece,
    pageX: number,
    pageY: number,
    offset: DragOffset,
    size: DragSize,
  ) => void;
  onDragMove: (pageX: number, pageY: number) => void;
  onDrop: (piece: TrianglePiece, pageX: number, pageY: number) => void;
  onDragCancel: () => void;
}): React.JSX.Element {
  const pieceSize = theme.layout.isTiny ? 66 : theme.layout.isCompact ? 78 : 92;
  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onShouldBlockNativeResponder: () => true,
        onPanResponderGrant: event => {
          const {locationX, locationY, pageX, pageY} = event.nativeEvent;
          onDragStart(
            piece,
            pageX,
            pageY,
            {x: locationX, y: locationY},
            {width: pieceSize, height: pieceSize},
          );
        },
        onPanResponderMove: (_, gesture) => {
          onDragMove(gesture.moveX, gesture.moveY);
        },
        onPanResponderRelease: (_, gesture) => {
          onDrop(piece, gesture.moveX, gesture.moveY);
        },
        onPanResponderTerminate: onDragCancel,
      }),
    [onDragCancel, onDragMove, onDragStart, onDrop, piece, pieceSize],
  );

  return (
    <View
      {...responder.panHandlers}
      style={[
        styles.pieceTouchable,
        {width: pieceSize, height: pieceSize},
        active && styles.pieceDragging,
      ]}>
      <PieceShape piece={piece} />
    </View>
  );
}

function PieceShape({piece}: {piece: TrianglePiece}): React.JSX.Element {
  const miniCell = theme.layout.isTiny ? 15 : theme.layout.isCompact ? 17 : 20;
  const miniGap = theme.layout.isTiny ? 2 : 3;
  const points = piece.cells.map(cellId => {
    const cell = triangleCells[cellId];
    const rowCount = cell.row + 1;
    const rowWidth = rowCount * miniCell + (rowCount - 1) * miniGap;
    const maxRowWidth = 5 * miniCell + 4 * miniGap;
    return {
      x: (maxRowWidth - rowWidth) / 2 + cell.col * (miniCell + miniGap),
      y: cell.row * (miniCell + miniGap),
    };
  });
  const minX = Math.min(...points.map(point => point.x));
  const minY = Math.min(...points.map(point => point.y));
  const maxX = Math.max(...points.map(point => point.x)) + miniCell;
  const maxY = Math.max(...points.map(point => point.y)) + miniCell;

  return (
    <View
      style={[
        styles.shape,
        {
          width: maxX - minX,
          height: maxY - minY,
        },
      ]}>
      {points.map((point, index) => (
        <View
          key={`${piece.id}-${piece.cells[index]}`}
          style={[
            styles.shapeCell,
            {
              width: miniCell,
              height: miniCell,
              left: point.x - minX,
              top: point.y - minY,
              backgroundColor: piece.color,
              borderColor: piece.color,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  top: {
    minHeight: theme.layout.isTiny ? 52 : theme.layout.isCompact ? 60 : 68,
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
    backgroundColor: theme.colors.panel,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(111, 71, 20, 0.55)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 9 : 14,
  },
  metric: {
    minWidth: theme.layout.isTiny ? 42 : theme.layout.isCompact ? 48 : 56,
  },
  metricLabel: {
    color: theme.colors.goldDark,
    fontFamily: theme.fonts.body,
    fontSize: theme.layout.isTiny ? 7 : theme.layout.isCompact ? 8 : 10,
    letterSpacing: theme.layout.isTiny ? 0.5 : 1.1,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: theme.colors.text,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 13 : theme.layout.isCompact ? 15 : 18,
  },
  topActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.layout.isTiny ? 4 : theme.layout.isCompact ? 5 : 8,
  },
  smallButton: {
    minHeight: theme.layout.isTiny ? 25 : theme.layout.isCompact ? 27 : 30,
    minWidth: theme.layout.isTiny ? 58 : theme.layout.isCompact ? 64 : 74,
    paddingHorizontal: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 7 : 10,
    justifyContent: 'center',
  },
  smallText: {
    flex: 1,
    fontSize: theme.layout.isTiny ? 8 : 9,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: screenHorizontal,
    paddingTop: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 12 : 18,
    paddingBottom: bottomScreenInset + (theme.layout.isCompact ? 12 : 18),
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 12 : 16,
  },
  statusCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    padding: theme.layout.isTiny ? 9 : theme.layout.isCompact ? 11 : 14,
    gap: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
  },
  message: {
    color: theme.colors.text,
  },
  board: {
    alignItems: 'center',
    gap: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
  },
  boardRow: {
    flexDirection: 'row',
    gap: theme.layout.isTiny ? 5 : theme.layout.isCompact ? 6 : 8,
  },
  boardCell: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.panelDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tray: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
  },
  pieceTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.layout.isTiny ? 6 : theme.layout.isCompact ? 8 : 10,
  },
  pieceDragging: {
    opacity: 0.16,
    zIndex: 20,
    elevation: 8,
  },
  dragLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 100,
  },
  shape: {
    position: 'relative',
  },
  shapeCell: {
    position: 'absolute',
    borderRadius: theme.layout.isTiny ? 4 : 5,
    borderWidth: 1,
    shadowColor: theme.colors.goldBright,
    shadowOpacity: 0.18,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  completeCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.goldBright,
    backgroundColor: theme.colors.panel,
    padding: theme.layout.isTiny ? 10 : theme.layout.isCompact ? 12 : 16,
    gap: theme.layout.isTiny ? 8 : theme.layout.isCompact ? 10 : 14,
  },
  completeTitle: {
    color: theme.colors.goldBright,
    fontFamily: theme.fonts.title,
    fontSize: theme.layout.isTiny ? 16 : theme.layout.isCompact ? 18 : 22,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default RelicAssemblyGameScreen;
