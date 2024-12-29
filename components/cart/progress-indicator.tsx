export function ProgressIndicator({ currentStep }: { currentStep: 'review' | 'confirm' }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-1 bg-gray-200">
            <div 
              className={`h-full bg-blue-500 transition-all duration-300 ${
                currentStep === 'confirm' ? 'w-full' : 'w-1/2'
              }`}
            />
          </div>
        </div>
        <div className="relative flex justify-between">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <span className="mt-2 text-sm text-gray-600">Cart review</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-4 h-4 rounded-full ${
              currentStep === 'confirm' ? 'bg-blue-500' : 'bg-gray-200'
            }`} />
            <span className="mt-2 text-sm text-gray-600">Confirm purchase</span>
          </div>
        </div>
      </div>
    </div>
  )
}

