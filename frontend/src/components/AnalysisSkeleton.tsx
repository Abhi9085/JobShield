const skeletonClass = `
relative overflow-hidden
bg-slate-200 dark:bg-slate-900
before:absolute before:inset-0
before:animate-shimmer
before:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.25)_50%,transparent_75%)]
dark:before:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%)]
before:bg-[length:200%_100%]
`;

export const AnalysisSkeleton = () => {
  return (
    <div className="space-y-6">

      {/* Risk Meter */}
      <div className="flex flex-col items-center justify-center py-6">

        <div className={`h-44 w-44 rounded-full ${skeletonClass}`} />

        <div className={`mt-6 h-10 w-32 rounded-full ${skeletonClass}`} />

      </div>

      {/* Divider */}
      <div className={`h-px w-full ${skeletonClass}`} />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Indicators */}
        <div className="space-y-3">

          <div className={`mb-4 h-4 w-40 rounded ${skeletonClass}`} />

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className={`h-14 rounded-xl ${skeletonClass}`}
            />
          ))}

        </div>

        {/* Analytics */}
        <div className="space-y-3">

          <div className={`mb-4 h-4 w-40 rounded ${skeletonClass}`} />

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className={`h-16 rounded-xl ${skeletonClass}`}
            />
          ))}

        </div>

      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">

        <div className={`mb-6 h-4 w-52 rounded ${skeletonClass}`} />

        <div className="space-y-5">

          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-2">

              <div className="flex justify-between">

                <div className={`h-3 w-32 rounded ${skeletonClass}`} />

                <div className={`h-3 w-10 rounded ${skeletonClass}`} />

              </div>

              <div className={`h-2 rounded-full ${skeletonClass}`} />

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};