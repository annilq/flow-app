import { Divider } from "antd";

function HLine() {
  return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          height:50,
        }}
      >
        <Divider
          type="vertical"
          style={{ position: "absolute", height: "100%",padding:0 }}
        />
      </div>
  );
}
export default HLine;
