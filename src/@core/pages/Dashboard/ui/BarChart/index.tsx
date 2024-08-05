import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type Props = {
  data: any;
};

export const BarChart: FC<Props> = (props) => {
  const { data } = props;

  return (
    <Bar
      data={{
        labels: !data
          ? []
          : data?.slice(0, 10).map((_: string, index: number) => index + 1),
        datasets: [
          {
            label: "Dataset 1",
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
    />
  );
};
