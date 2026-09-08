import { FormLayoutProps } from "@/lib/types";


export default function FormLayout({title, subTitle, children}: FormLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-gray-900 border-gray-800 border rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <p className="text-gray-400 text-sm mt-1">{subTitle}</p>
        </div>

        {children}
      </div>
    </div>
  )
}
