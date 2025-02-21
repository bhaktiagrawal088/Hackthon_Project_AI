import PropTypes from "prop-types";

export function Tabs({ children }) {
  return <div className="tabs">{children}</div>;
}

export function TabsContent({ children }) {
  return <div className="tabs-content">{children}</div>;
}

export function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
}

export function TabsTrigger({ children }) {
  return <button className="tabs-trigger">{children}</button>;
}

// ✅ Define PropTypes
Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

TabsContent.propTypes = {
  children: PropTypes.node.isRequired,
};

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
};

TabsTrigger.propTypes = {
  children: PropTypes.node.isRequired,
};
