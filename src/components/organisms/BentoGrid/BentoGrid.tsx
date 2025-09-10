import React, { useMemo, Children, isValidElement } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useAppTheme, getMergedStyles } from "../../../theme/utils";
import { defaultBentoGridStyles } from "./BentoGrid.styles";
import { BentoGridProps, BentoGridStyleProps } from "./BentoGrid.types";
import BentoItem, { BentoItemProps } from "./BentoItem";

const BentoGrid: React.FC<BentoGridProps> = ({ children, gridMargin = 16, gridGap = 12, gridColumns = 3, customStyles }) => {
  const { theme } = useAppTheme();
  const { width: screenWidth } = useWindowDimensions();
  const availableWidth = screenWidth - gridMargin * 2;
  const itemBaseWidth = (availableWidth - gridGap * (gridColumns - 1)) / gridColumns;

  const merged = useMemo(
    () => getMergedStyles<BentoGridStyleProps, "default">(theme, "BentoGrid", defaultBentoGridStyles(theme), undefined, customStyles),
    [theme, customStyles]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          ...merged.container,
          position: "relative",
          width: "100%",
        },
      }),
    [merged]
  );

  const occupiedPositions = useMemo(() => {
    return { current: {} as { [key: string]: boolean } };
  }, [children, theme, screenWidth, gridColumns, gridGap]);

  const getBentoItemStyle = (child: React.ReactElement<BentoItemProps>) => {
    const { width, height, style } = child.props;

    const itemW = width * itemBaseWidth + (width - 1) * gridGap;
    const itemH = height * itemBaseWidth + (height - 1) * gridGap;

    let col = 0;
    let row = 0;
    let found = false;

    while (!found) {
      found = true;
      for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
          const pos = `${col + w},${row + h}`;
          if (col + w >= gridColumns || occupiedPositions.current[pos]) {
            found = false;
            break;
          }
        }
        if (!found) break;
      }

      if (!found) {
        col++;
        if (col + width > gridColumns) {
          col = 0;
          row++;
        }
        continue;
      }

      for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
          occupiedPositions.current[`${col + w},${row + h}`] = true;
        }
      }
    }

    const left = col * (itemBaseWidth + gridGap);
    const top = row * (itemBaseWidth + gridGap);

    return {
      ...style,
      position: "absolute" as const,
      width: itemW,
      height: itemH,
      left,
      top,
    };
  };

  const getGridHeight = (): number => {
    let maxRow = 0;
    Object.keys(occupiedPositions.current).forEach((pos) => {
      const row = parseInt(pos.split(",")[1]);
      maxRow = Math.max(maxRow, row);
    });
    return (maxRow + 1) * (itemBaseWidth + gridGap);
  };

  return (
    <View style={[styles.container, { padding: gridMargin, minHeight: getGridHeight() }]}>
      {Children.map(children, (child) => {
        if (isValidElement<BentoItemProps>(child) && child.type === BentoItem) {
          return React.cloneElement(child, {
            style: getBentoItemStyle(child),
          });
        }
        return null;
      })}
    </View>
  );
};

export default BentoGrid;
