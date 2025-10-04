interface TranslationItem {
  key: string;
  sourceLang: string;
  targetLang: string;
  sourceText: string;
  translatedText: string;
}

export const JsonKeyExtractor = (json: unknown, sourceLang: string, targetLang: string): TranslationItem[] => {
  const result: TranslationItem[] = [];

  const pushValue = (fullKey: string, value: unknown) => {
    result.push({
      key: fullKey,
      sourceLang,
      targetLang,
      sourceText: value === null || value === undefined ? '' : String(value),
      translatedText: '',
    });
  };

  const traverse = (node: unknown, parentKey = '') => {
    if (node === null || node === undefined) {
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((el, i) => {
        const fullKey = parentKey ? `${parentKey}[${i}]` : `[${i}]`;
        if (el !== null && typeof el === 'object') {
          traverse(el, fullKey);
        } else {
          pushValue(fullKey, el);
        }
      });
      return;
    }

    if (typeof node === 'object') {
      for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
        const fullKey = parentKey ? `${parentKey}.${k}` : k;
        if (v !== null && typeof v === 'object') {
          traverse(v, fullKey);
        } else {
          pushValue(fullKey, v);
        }
      }
      return;
    }

    // 基本类型（string/number/boolean）
    if (parentKey) pushValue(parentKey, node);
  };

  traverse(json, '');
  return result;
};
