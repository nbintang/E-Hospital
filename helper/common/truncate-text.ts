export   const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };