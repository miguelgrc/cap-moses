import { Collapse, Space } from "antd";

const PropKeyEditorObjectFieldTemplate = ({ properties }) => {
  const [first, ...rest] = properties;
  const elements = [first, { title: "Field UI Options", content: rest }];

  const isUiSettings = properties.find((prop) => prop.name === "ui:options");

  return isUiSettings ? (
    <Collapse
      className="propKeyCollapse"
      style={{ margin: "0 10px 10px 10px" }}
      defaultActiveKey={Array.from(Array(properties.length).keys())}
      expandIconPosition="end"
      items={elements.map((item, index) => ({
        key: index,
        label: item.title || item.content.props.schema.title,
        children: item.content.length
          ? item.content.map((i) => i.content)
          : item.content,
      }))}
    />
  ) : (
    <Space direction="vertical" style={{ margin: "0 10px" }}>
      {properties.map((item) => item.content)}
    </Space>
  );
};

export default PropKeyEditorObjectFieldTemplate;
