import React from "react";

const dataComponent = (configItem, dataItem) => {
  if (!configItem.component) {
    return `${dataItem[configItem.fieldName]}`;
  }

  return configItem.component({ data: dataItem });
};

const getRowDataKey = (dataItem, keyFieldName, index) => {
  const result = dataItem[keyFieldName];
  if (result === null || result === undefined) {
    // Using index as key is not recommended due to data order changes and performance issues, and therefore we warn
    console.warn(
      `Data object has no data on field ${keyFieldName}, using index as key which is not  recommended `
    );
    return index;
  }
  return result;
};

const getFieldKey = configItem => {
  // Config items doesn't necessarily have fieldName, especially ones who have custom component
  return configItem.fieldName || configItem.title;
};

const Grid = ({ config, data, keyFieldName = "id" }) => (
  <table>
    <thead>
      <tr>
        {config.map(item => (
          <th key={"header" + getFieldKey(item)}>{item.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((dataItem, dataIndex) => {
        const dataKey = getRowDataKey(dataItem, keyFieldName, dataIndex);
        return (
          <tr key={dataKey}>
            {config.map(configItem => (
              <td key={getFieldKey(configItem) + dataKey}>
                {dataComponent(configItem, dataItem)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default Grid;
