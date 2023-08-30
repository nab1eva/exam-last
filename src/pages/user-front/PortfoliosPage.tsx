import { useEffect, useState } from "react";
import { PortfolioForm } from "../../types";
import { PAGELIMIT } from "../../const";
import { Pagination } from "antd";
import { usePortfolios } from "../../states/portfolios";
import { useAuth } from "../../states/auth";
import PortfolioCard from "../../components/cards/PortfolioCard";
import "./style.scss";

const PortfoliosPage = () => {
  const { userId } = useAuth();

  const { getPortfolios, portfoliosData, totalPortfolios } = usePortfolios();
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPortfolios(userId, page, PAGELIMIT);
  }, [getPortfolios, userId, page]);

  const onChange = (current: number) => {
    setPage(current);
  };

  return (
    <section className="container">
      <div className="portfolios-heading">
        <h4>Projects</h4>
      </div>
      <div className="projects-list">
        {portfoliosData.map((portfolio: PortfolioForm) => (
          <PortfolioCard key={portfolio._id} {...portfolio} />
        ))}
      </div>
      {totalPortfolios > PAGELIMIT ? (
        <div className="portfolios-pagination">
          <Pagination
            current={page}
            onChange={onChange}
            total={totalPortfolios}
          />
        </div>
      ) : null}
    </section>
  );
};

export default PortfoliosPage;
