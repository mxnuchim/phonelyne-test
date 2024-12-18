interface PlanDetailItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const PlanDetailItem: React.FC<PlanDetailItemProps> = ({
  label,
  value,
  icon,
}) => {
  return (
    <li className="flex justify-between">
      <div className="flex items-center justify-center gap-2">
        {icon}
        <span className="font-light text-gray-600">{label}</span>
      </div>
      <span className="font-medium text-gray-800 text-base">{value}</span>
    </li>
  );
};

export default PlanDetailItem;
