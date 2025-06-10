"use client";
import Script from "next/script";

const VoiceAgentWidget = () => {
  return (
    <Script 
      src="https://omnivox.io/widget/embed.js?url=https%3A%2F%2Fomnivox.io%2F%3Fagent%3DLoddie%26corpus%3Db083536a-ea9f-47d7-a7b7-47b571595592%26prompt%3DYou%2520are%2520a%2520website%2520widget%2520that%2520can%2520talk%2520to%2520people%2520on%2520the%2520website%2520for%2520AI%2520Power%2520Grid.%250A%250AAI%2520Power%2520Grid%2520is%2520a%2520decentralized%252C%2520open-source%2520network%2520where%2520community-run%2520AI%2520workers%2520generate%2520images%2520and%2520text%2520and%2520earn%2520AIPG%2520coins.%250A%250AExample%2520of%2520greeting%2520-%2520Hi!%2520I%25E2%2580%2599m%2520Loddie%25E2%2580%2594ask%2520me%2520anything%2520about%2520AI%2520Power%2520Grid%252C%2520from%2520running%2520open-source%2520workers%2520and%2520earning%2520AIPG%2520to%2520using%2520our%2520image%2520%2526%2520text%2520API!&name=Loddie&avatar=https://aipowergrid.io/loddie.jpeg&theme=dark&position=bottom-right"
      strategy="afterInteractive"
    />
  );
};

export default VoiceAgentWidget; 