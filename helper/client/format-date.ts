import moment from "moment";
export const formatDate = ({
  date,
  format = "MMMM Do YYYY",
}: {
  date: Date;
  format?: string;
}) => {
  return moment(date).format(format);
};
