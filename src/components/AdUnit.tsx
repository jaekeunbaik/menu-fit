import { useEffect } from "react";

type AdUnitProps = {
    slot: string;
    format?: "auto" | "fluid" | "rectangle";
    responsive?: boolean;
};

const AdUnit = ({ slot, format = "auto", responsive = true }: AdUnitProps) => {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    return (
        <div style={{ overflow: "hidden" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
};

export default AdUnit;
