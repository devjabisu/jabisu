"use client";

type AppCardProp = {
  id: string;
  title: string;
  description: string;
  short: string;
};

const Appcard = (props: AppCardProp) => {
  // find out if the card is already pinned

  return (
    <div>
      <div
        key={props.id}
        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a
          href={`/${props.short}`}
          className="flex items-center justify-center"
        >
          <img
            className="h-20 rounded-t-lg aspect-16/10 pt-4"
            src={`/${props.short}.svg`}
            alt=""
          />
        </a>
        <div className="p-5 h-36">
          <div className="h-12 text-center">
            <a href={`/${props.short}`}>
              <h5 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.title}
              </h5>
            </a>
          </div>
          <p className="mt-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appcard;
