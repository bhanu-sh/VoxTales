import styles from "./GenreCards.module.css";

const GenreCards = () => {
  return (
    <div className="pt-20 flex flex-wrap justify-around sm:flex-row sm:justify-around">
      <div className={styles.card + " mb-8"}>
        <img src="/icons/crime.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Crime</p>
          <p className={styles.card__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
      <img src="/icons/history.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>History</p>
          <p className={styles.card__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
      <img src="/icons/horror.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Horror</p>
          <p className={styles.card__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </div>
      <div className={styles.card + " mb-8"}>
      <img src="/icons/science.png" alt="thumb" />
        <div className={styles.card__content}>
          <p className={styles.card__title}>Science</p>
          <p className={styles.card__description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenreCards;
