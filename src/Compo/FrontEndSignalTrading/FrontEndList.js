export default function FrontEndSignalList({ MainHeading, Paragraph, imgsrc }) {
    return (
        <div className='col-lg-4 FrontSignal-box'>
            <img src={imgsrc} alt={MainHeading} />
            <h3 className='Frontsignal-mainname'>{MainHeading}</h3>
            <p>{Paragraph}</p>
        </div>
    );
}
