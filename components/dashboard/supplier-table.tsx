interface SupplierTableProps {
  suppliers: Array<{
    name: string
    reduction: number
  }>
}

export function SupplierTable({ suppliers }: SupplierTableProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Top 5 supplier by cost reduction</h3>
      <div className="space-y-2">
        {suppliers.map((supplier, index) => (
          <div
            key={supplier.name}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <span>{supplier.name}</span>
            <span className="font-semibold">
              ${supplier.reduction.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

