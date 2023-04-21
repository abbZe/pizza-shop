import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="135" cy="111" r="105" />
      <rect x="0" y="277" rx="10" ry="10" width="280" height="91" />
      <rect x="0" y="379" rx="10" ry="10" width="130" height="26" />
      <rect x="141" y="379" rx="25" ry="25" width="130" height="40" />
      <rect x="0" y="232" rx="10" ry="10" width="280" height="35" />
    </ContentLoader>
  </div>
);

export default Skeleton;
