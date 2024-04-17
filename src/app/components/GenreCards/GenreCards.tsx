import Link from "next/link";
import styles from "./genrecards.module.css";

const GenreCards = () => {
  return (
    <div className="pt-20 flex flex-wrap gap-3 justify-around sm:flex-row sm:justify-around">
      <div className={styles.card + " mb-8"}>
        <img src="/icons/crime.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Crime</p>
          <Link
            href="/podcasts/genres/crime"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
        <img src="/icons/history.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>History</p>
          <Link
            href="/podcasts/genres/history"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
        <img src="/icons/horror.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Horror</p>
          <Link
            href="/podcasts/genres/horror"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
        <img src="/icons/science.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Science</p>
          <Link
            href="/podcasts/genres/science"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
        <img src="/icons/science.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Comedy</p>
          <Link
            href="/podcasts/genres/comedy"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
        <img src="/icons/science.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Fiction</p>
          <Link
            href="/podcasts/genres/fiction"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
        <img src="/icons/science.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Non-Fiction</p>
          <Link
            href="/podcasts/genres/nonfiction"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
        <img src="/icons/science.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Technology</p>
          <Link
            href="/podcasts/genres/technology"
            className={styles.card__description}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GenreCards;
