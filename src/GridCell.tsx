interface GridCellProps {
    symbol: string | null;
    onClick: () => void;
    disabled: boolean;
}

export function GridCell({ symbol, onClick, disabled }: GridCellProps) {
    return (
        <div
            className={`grid-cell ${disabled ? 'grid-cell--disabled' : ''}`}
            onClick={onClick}
        >
            {symbol}
        </div>
    );
}