"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BASE_PHRASE = "I want a guide ";

const SENTENCES = [
  "I want a guide in Oslo on the 15th of December",
  "I want a guide in Munich on November 29th",
  "I want a guide in Paris on the 10th of December",
];

const ENDINGS = SENTENCES.map((sentence) =>
  sentence.startsWith(BASE_PHRASE) ? sentence.slice(BASE_PHRASE.length) : sentence
);

const TYPING_SPEED_RANGE = [70, 90] as const;
const DELETING_SPEED_RANGE = [40, 60] as const;
const PAUSE_RANGE = [1500, 2000] as const;
const TRANSITION_RANGE = [220, 400] as const;
const CURSOR_BLINK_INTERVAL = 500;

const getRandomInRange = ([min, max]: readonly [number, number]) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getValueLength = (value: unknown) => {
  if (typeof value === "string" || typeof value === "number") {
    return `${value}`.length;
  }
  if (Array.isArray(value)) {
    return value.join("").length;
  }
  return 0;
};

type DynamicPlaceholderProps = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  "placeholder"
>;

const DynamicPlaceholder = ({
  className,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  ...rest
}: DynamicPlaceholderProps) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(() => {
    if (value !== undefined) {
      return getValueLength(value) > 0;
    }
    if (defaultValue !== undefined) {
      return getValueLength(defaultValue) > 0;
    }
    return false;
  });

  const typingTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(
    null
  );
  const blinkingIntervalRef = useRef<ReturnType<typeof window.setInterval> | null>(
    null
  );

  const endings = useMemo(() => ENDINGS, []);

  useEffect(() => {
    if (value !== undefined) {
      setHasContent(getValueLength(value) > 0);
    }
  }, [value]);

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      setHasContent(getValueLength(defaultValue) > 0);
    }
  }, [defaultValue, value]);

  useEffect(() => {
    blinkingIntervalRef.current = window.setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, CURSOR_BLINK_INTERVAL);

    return () => {
      if (blinkingIntervalRef.current) {
        window.clearInterval(blinkingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    if (isFocused || endings.length === 0) {
      return;
    }

    const ending = endings[currentSentenceIndex] ?? "";

    if (!isDeleting && charIndex < ending.length) {
      typingTimeoutRef.current = window.setTimeout(() => {
        setCharIndex((index) => index + 1);
      }, getRandomInRange(TYPING_SPEED_RANGE));
      return;
    }

    if (!isDeleting && charIndex === ending.length) {
      typingTimeoutRef.current = window.setTimeout(() => {
        setIsDeleting(true);
      }, getRandomInRange(PAUSE_RANGE));
      return;
    }

    if (isDeleting && charIndex > 0) {
      typingTimeoutRef.current = window.setTimeout(() => {
        setCharIndex((index) => index - 1);
      }, getRandomInRange(DELETING_SPEED_RANGE));
      return;
    }

    if (isDeleting && charIndex === 0) {
      typingTimeoutRef.current = window.setTimeout(() => {
        setIsDeleting(false);
        setCurrentSentenceIndex((index) => (index + 1) % endings.length);
      }, getRandomInRange(TRANSITION_RANGE));
    }
  }, [charIndex, currentSentenceIndex, endings, isDeleting, isFocused]);

  useEffect(
    () => () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    },
    []
  );

  const currentEnding = endings[currentSentenceIndex] ?? "";
  const typedEnding = currentEnding.slice(0, charIndex);
  const placeholderText = hasContent
    ? ""
    : `${BASE_PHRASE}${typedEnding}${cursorVisible ? "|" : "\u00a0"}`;

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHasContent(event.target.value.length > 0);
    onChange?.(event);
  };

  return (
    <Input
      {...rest}
      {...(value !== undefined ? { value } : {})}
      {...(value === undefined && defaultValue !== undefined ? { defaultValue } : {})}
      className={cn(
        "border-0 focus-visible:ring-0 shadow-none h-12 px-4 bg-transparent",
        className
      )}
      placeholder={placeholderText}
      autoComplete={rest.autoComplete ?? "off"}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

DynamicPlaceholder.displayName = "DynamicPlaceholder";

export default DynamicPlaceholder;

