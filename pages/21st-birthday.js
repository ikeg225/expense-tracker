import styles from '../styles/21stBirthday.module.css'
import Image from 'next/image'

export default function RSF() {
    return (
        <div className={styles.main}>
            <p>Here is some intro text about taking her down memory lane??</p>
            <Image src="/images/IMG_0213_Original.HEIC" width={500} height={500} />
        </div>
    )
}