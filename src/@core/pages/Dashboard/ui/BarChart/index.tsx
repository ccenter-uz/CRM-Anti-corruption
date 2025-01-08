import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type Props = {
  data: any;
  isMore: boolean;
};

export const BarChart: FC<Props> = (props) => {
  const { data, isMore } = props;

  return (
    <Bar
      data={{
        labels: !data
          ? []
          : isMore
          ? data?.map((_: string, index: number) => index + 1)
          : data?.slice(0, 10).map((_: string, index: number) => index + 1),
        datasets: [
          {
            label: "",
            data: !data
              ? []
              : data?.map(
                  (item: { findApplicationCount: number }) =>
                    item?.findApplicationCount
                ),
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};
