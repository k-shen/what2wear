import { Dropdown } from 'react-bootstrap';
import '../styles/mode.css';

export type ForecastMode = 'current' | '3hr' | '9hr' | '3day' | '5day';

interface ModeProps {
    mode: ForecastMode;
    onModeChange: (mode: ForecastMode) => void;
}

const Mode = ({ mode, onModeChange }: ModeProps) => {
    const modes: Array<{ value: ForecastMode; label: string }> = [
        { value: 'current', label: 'Current Weather' },
        { value: '3hr', label: '3hr Forecast' },
        { value: '9hr', label: '9hr Forecast' },
        { value: '3day', label: '3 Day Forecast' },
        { value: '5day', label: '5 Day Forecast' }
    ];

    const currentMode = modes.find((m) => m.value === mode)?.label || 'Select Mode';

    return (
        <div className="mode-container">
            <p>Forecast Mode: </p>
            <Dropdown className="mode-dropdown">
                <Dropdown.Toggle id="dropdown-mode">{currentMode}</Dropdown.Toggle>

                <Dropdown.Menu>
                    {modes.map((option) => (
                        <Dropdown.Item
                            key={option.value}
                            onClick={() => onModeChange(option.value)}
                            active={mode === option.value}>
                            {option.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Mode;
