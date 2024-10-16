interface GridCellProps {
    symbol: string | null;
    onClick: () => void;
}

export function GridCell({ symbol, onClick }: GridCellProps) {
    return (
        <div className="grid-cell" onClick={onClick}>{symbol}</div>
    );
}