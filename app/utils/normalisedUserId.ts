export const normalizeUserId = (user_id: any) => {
  // case 1: stringified JSON
  if (typeof user_id === "string") {
    try {
      const parsed = JSON.parse(user_id);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch {
      // not JSON, fallback
      return { userId: user_id };
    }
  }

  // case 2: already object
  if (typeof user_id === "object" && user_id !== null) {
    return user_id;
  }

  return null;
};
