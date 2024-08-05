import { FC } from "react";
import { Line } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

type Props = {
  data: any;
};

export const LineChart: FC<Props> = (props) => {
  const { data } = props;

  return (
    <Line
      data={{
        labels: !data ? [] : data?.map((_: string, index: number) => index + 1),
        datasets: [
          {
            label: "# of Votes",
            data: !data
              ? []
              : data?.map(
                  (item: { applicationCountRegion: number }) =>
                    item?.applicationCountRegion
                ),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
