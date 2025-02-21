import PropTypes from 'prop-types';

export function Card({ children }) {
  return <div className="border rounded-lg p-4 shadow-md">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardHeader({ children }) {
  return <div className="border-b p-2 font-bold">{children}</div>;
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};
