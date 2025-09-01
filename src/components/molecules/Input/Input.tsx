import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, TextInput, StyleSheet, Animated, ActivityIndicator } from "react-native";

import { Label, Icon } from "../../atoms";
import { Button } from "../../molecules";

import { defaultTheme } from "../../../theme/themes";
import { useAppTheme, getMergedStyles } from "../../../theme/utils";

import { InputProps, InputStyleProps, InputVariant } from "./Input.types";
import { defaultInputStyles } from "./Input.styles";

export const Input = ({
  variant = "primary",
  value,
  label,
  onChangeText,
  onValidValue,
  validators = [],
  asyncValidators = [],
  refreshTrigger,
  customStyles,
  ...rest
}: InputProps) => {
  const { theme } = useAppTheme();

  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  const validationRequestId = useRef(0);
  const clearedInput = useRef(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  const merged = useMemo(
    () => getMergedStyles<InputStyleProps, InputVariant>(theme, "Input", defaultInputStyles(theme), variant, customStyles),
    [theme, variant, customStyles]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: merged.container,
        inputContainer: merged.inputContainer,
        errorText: merged.errorText,
        iconContainer: merged.iconContainer,
        input: {
          ...merged.input,
          borderColor: error ? theme.colors.error : focused ? theme.colors.primary : theme.colors.secondary,
          fontSize: theme.fontSizes.base,
          ...(customStyles?.input || {}),
        },
        label: {
          color: error ? theme.colors.error : theme.colors.text,
          fontSize: theme.fontSizes.sm,
          ...(customStyles?.label || {}),
          ...(variant === "secondary" && {
            position: "absolute",
            top: -10,
            left: 8,
            zIndex: 2,
            paddingHorizontal: theme.spacing.xs,
            backgroundColor: theme.colors.background,
          }),
          ...(variant === "tertiary" && {
            position: "absolute",
            top: focused || value ? -10 : 12,
            left: 8,
            zIndex: 2,
            paddingHorizontal: theme.spacing.xs,
            backgroundColor: theme.colors.background,
            fontSize: focused || value ? theme.fontSizes.sm : theme.fontSizes.base,
          }),
        },
      }),
    [focused, error, variant, value, customStyles, theme]
  );

  useEffect(() => {
    if (variant === "tertiary") {
      Animated.timing(animatedLabel, {
        toValue: focused || value.length > 0 ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [focused, value, variant]);

  useEffect(() => {
    if (!refreshTrigger || !touched) return;
    validateInput(value);
  }, [JSON.stringify(refreshTrigger)]);

  const validateInput = async (inputValue: string) => {
    for (const validator of validators) {
      const result = validator(inputValue);
      if (!result.valid) {
        setError(result.message || "Invalid input");
        return;
      }
    }

    if (asyncValidators.length > 0) {
      const requestId = ++validationRequestId.current;
      setValidating(true);

      for (const asyncValidator of asyncValidators) {
        try {
          const result = await asyncValidator(inputValue);

          if (requestId !== validationRequestId.current) return;

          if (!result.valid) {
            setError(result.message || "Invalid input");
            setValidating(false);
            return;
          }
        } catch (err) {
          setError("Validation error");
          setValidating(false);
          return;
        }
      }

      setValidating(false);
    }

    setError(null);
    onValidValue?.(inputValue);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setTouched(true);
      if (clearedInput.current) {
        clearedInput.current = false;
        return;
      }
      setFocused(false);
      validateInput(value);
    }, 150);
  };

  const handleClear = () => {
    onChangeText("");
    clearedInput.current = true;
    setFocused(false);
    validateInput("");
  };

  const handleChangeText = (text: string) => {
    onChangeText(text);
    if (error) setError(null);
  };

  const renderIcon = () => {
    if (validating) {
      return <ActivityIndicator size="small" color={defaultTheme.colors.textSecondary} />;
    }

    if (focused && value.length > 0) {
      return (
        <Button onPress={handleClear} backgroundColor="transparent" padding={4}>
          <Icon name="close-circle" library="ionicons" />
        </Button>
      );
    }

    if (error) {
      return <Icon name="alert-circle" library="ionicons" customStyles={undefined} />;
    }

    if (value.length > 0 && (validators.length > 0 || asyncValidators.length > 0)) {
      return <Icon name="checkmark-circle" library="ionicons" customStyles={undefined}/>;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {label &&
          (variant === "tertiary" ? (
            <Animated.Text
              style={[
                styles.label,
                {
                  top: animatedLabel.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, -10],
                  }),
                  fontSize: animatedLabel.interpolate({
                    inputRange: [0, 1],
                    outputRange: [theme.fontSizes.base, theme.fontSizes.sm],
                  }),
                },
              ]}
            >
              {label}
            </Animated.Text>
          ) : (
            <Label customStyle={styles.label}>{label}</Label>
          ))}

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          placeholder={variant === "tertiary" ? "" : rest.placeholder}
          placeholderTextColor={defaultTheme.colors.textSecondary}
          {...rest}
        />

        <View style={styles.iconContainer}>{renderIcon()}</View>
      </View>

      {error && <Label customStyle={styles.errorText}>{error}</Label>}
    </View>
  );
};

export default Input;
