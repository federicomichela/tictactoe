import './BoardCell.scss';

export interface GridCellProps {
    symbol: string | null;
    onClick: () => void;
    disabled: boolean;
}

export function BoardCell({ symbol, onClick, disabled }: GridCellProps) {
    return (
        <div
            className={`board-cell ${disabled ? 'board-cell--disabled' : ''}`}
            onClick={onClick}
        >
            {symbol}
        </div>
    );
}