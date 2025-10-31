import NewBriefing, { BriefingProperties } from "../briefingNew/page";

export default function TestBriefing() {
  const briefingProps = {
    title: "Basel Briefing",
    subtitle: "Das Wichtigste für den Start in den Tag",
    lead: "Du willst wissen, was in Basel läuft, hast aber keine Lust, dich durch die Zeitungen und Online-Portale zu pflügen?",
    wakeup: {
      __html:
        'Wir von Bajour nehmen<br />dir diese Arbeit ab.<br />Wir stehen für dich werktags<br />um <span class="wakeuptext--time">3:00</span> Uhr auf',
    },
    ready: {
      __html:
        '<span class="readytext--everyday">Jeden Morgen ab</span><br /><span class="readytext--time">06:00</span><br /><span class="readytext--ready">für dich bereit</span>',
    },
    delivery: {
      __html:
        'und schicken dir<br />um <span class="deliverytext--time">6 Uhr</span> die wichtigsten<br />regionalen Tagesnews<br />plus unseren Senf dazu<br />per Mail.',
    },
    subscribe: {
      __html: "jetzt anmelden und immer<br />bestens informiert sein!",
    },
    mainBackground: "#feeae3",
    leadColor: "black",
    headerBackgroundImage: "/baselbriefing/images/bb-header-scaled.webp",
    readyBackgroundImage: "/baselbriefing/images/bb-ready-scaled.webp",
    independentBackgroundImage:
      "/baselbriefing/images/bb-independent-scaled.webp",
    footerBackgroundImage: "/baselbriefing/images/bb-footer-scaled.webp",
    blobBackground:
      "linear-gradient(to right top, var(--gradient-pink-dark), var(--gradient-pink-bright))",
    deliveryBackground:
      "linear-gradient(to top right, #00304b, #2161a6, #ffbaba)",
    subscribetextBackground:
      "linear-gradient(to right, var(--gradient-orange-dark), var(--gradient-orange-bright))",
    interests: ["47ed10ad9f", "22b72061f1"],
  } as BriefingProperties;

  return <NewBriefing {...briefingProps} />;
}
