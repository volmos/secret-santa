export default function LoadingSpinner() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle inline">
            <circle cx="12" cy="12" r="10" strokeDasharray="63" strokeDashoffset="21">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="2s"
                                  repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="8s" repeatCount="indefinite" keyTimes="0; 0.5; 1"
                         values="-16; -47; -16" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"/>
            </circle>
        </svg>
    );
}
