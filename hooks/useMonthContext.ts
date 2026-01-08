import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useMonthContext = () => {
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [isNewMonth, setIsNewMonth] = useState(false);

  useEffect(() => {
    const checkMonthRollover = async () => {
      const lastMonth = await AsyncStorage.getItem("lastSeenMonth");
      const lastYear = await AsyncStorage.getItem("lastSeenYear");

      if (
        Number(lastMonth) !== month ||
        Number(lastYear) !== year
      ) {
        setIsNewMonth(true);

        await AsyncStorage.setItem("lastSeenMonth", String(month));
        await AsyncStorage.setItem("lastSeenYear", String(year));
      }
    };

    checkMonthRollover();
  }, [month, year]);

  return { month, year, isNewMonth };
};
