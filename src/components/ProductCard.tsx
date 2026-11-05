import { Iproduct } from '@/type/type';

const ProductCard = ({ product }: {product: Iproduct}) => {
  const { nameBn, image, today, change } = product;


  const formatPrice = (price: number) =>
    new Intl.NumberFormat("bn-BD").format(price);

  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Product Information */}
      <div className="flex items-center gap-3">
        {/* Product Image */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          {image}
        </div>

        {/* Product Name & Unit */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {nameBn}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            প্রতি কেজি
          </p>
        </div>
      </div>

      {/* Price Information */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-0.5 text-base font-bold text-gray-900">
            ৳{formatPrice(today)}
            <span className="ml-1 text-xs font-normal text-gray-500">
              টাকা
            </span>
          </p>
        </div>

        {/* Price Change */}
        <div
          className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[12px] font-semibold rounded-xl px-2 ${change.dir == "up" ? "text-red-600 bg-red-50" : "text-green-600 bg-green-100"}`}
        >
          {
            change.dir == "up" ? <span> ▲ </span> : <span> ▼ </span>
          }
          <span>
            {formatPrice(change.pct)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard