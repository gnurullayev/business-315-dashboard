const DatepickerTranslations = (intl: any) => {
  let translations: any = {
    timePickerLocale: {},
    lang: {
      placeholder: "",
      locale: "",
      yearFormat: "YYYY-MM-DD HH:mm:ss",
      today: "",
      now: "",
      backToToday: "",
      ok: "",
      timeSelect: "",
      dateSelect: "",
      clear: "",
      month: "",
      year: "",
      previousMonth: "",
      nextMonth: "",
      monthSelect: "",
      yearSelect: "",
      decadeSelect: "",
      dayFormat: "",
      dateFormat: "",
      dateTimeFormat: "",
      previousYear: "",
      nextYear: "",
      previousDecade: "",
      nextDecade: "",
      previousCentury: "",
      nextCentury: "",
      rangePlaceholder: [
        intl.formatMessage({ id: "general.start_date" }),
        intl.formatMessage({ id: "general.end_date" }),
      ],
    },
  };

  return translations;
};

export default DatepickerTranslations;
