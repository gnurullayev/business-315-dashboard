import { Button } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, type FC } from "react";
import "./tyles.scss";

interface IProps {
  onChange: (a: any) => void;
  isLoading: boolean;
  isDataLength: boolean;
}

type handleChangeParamType = "left" | "right";

const Paginations: FC<IProps> = ({ onChange, isLoading, isDataLength }) => {
  const [page, setPage] = useState(1);
  const handleChange = (type: handleChangeParamType) => {
    let newPage = page;
    if (type === "left" && newPage > 0) {
      newPage -= 1;
    } else if (type === "right") {
      newPage += 1;
    }
    if (newPage > 0) {
      setPage(newPage);
      onChange(newPage);
    }
  };

  return (
    <div className="custom_pagination">
      <Button
        type="primary"
        onClick={() => handleChange("left")}
        disabled={isLoading || page === 1}
      >
        <ArrowLeft />
      </Button>
      <span className="custom_pagination__count">{page}</span>
      <Button
        type="primary"
        onClick={() => handleChange("right")}
        disabled={isLoading || isDataLength}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Paginations;
