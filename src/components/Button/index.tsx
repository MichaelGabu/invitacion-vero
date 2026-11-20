interface ButtonProps {
    label: string; icon?: string; color?: string; type?: string; className?: string; onClick: () => void;
}
export default function Button({ label, color = 'default', type = 'default', className = '', onClick }: ButtonProps) {
    return <button type="button" className={`button button--color-${color} button--type-${type} ${className}`} onClick={onClick}>
        <span className="button__text">{label}</span>
    </button>
}
import './button.css';
