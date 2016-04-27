Component.Siddhis = React.createClass({
  getInitialState: function () {
    return {
      complete: this.props.siddhis.complete,
      fiftySessions: this.props.siddhis.fiftySessions,
      fiveDays: this.props.siddhis.fiveDays,
      oneHour: this.props.siddhis.oneHour,
      oneHundredHours: this.props.siddhis.oneHundredHours,
      tenDays: this.props.siddhis.tenDays,
      thirtySessions: this.props.siddhis.thirtySessions,
      twentyMinutes: this.props.siddhis.twentyMinutes
    }
  },
  render() {
    let complete
    let fiftySessions
    let fiveDays
    let oneHour
    let oneHundredHours
    let tenDays
    let thirtySessions
    let twentyMinutes

    this.state.complete ? complete = <Component.SiddhisComplete /> : complete = <li>Finish all the challanges above</li>
    this.state.fiftySessions ? fiftySessions = <Component.SiddhisFiftySessions /> : fiftySessions = <li>Complete 50 meditation sessions</li>
    this.state.fiveDays ? fiveDays = <Component.SiddhisFiveDays /> : fiveDays = <li>Meditate for 5 days in a row</li>
    this.state.oneHour ? oneHour = <Component.SiddhisOneHour /> : oneHour = <li>Complete a 1 hour session</li>
    this.state.oneHundredHours ? oneHundredHours = <Component.SiddhisOneHundredHours /> : oneHundredHours = <li>Accumulate 33 hours of meditation time</li>
    this.state.tenDays ? tenDays = <Component.SiddhisTenDays /> : tenDays = <li>Meditate for 10 days in a row</li>
    this.state.thirtySessions ? thirtySessions = <Component.SiddhisThirtySessions /> : thirtySessions = <li>Complete 30 meditation sessions</li>
    this.state.twentyMinutes ? twentyMinutes = <Component.SiddhisTwentyMinutes /> : twentyMinutes = <li>Complete a 20 minute meditation session</li>

    return (
      <div className="row siddhi">
        <h2>Siddhis</h2>
        <h3>What is a Siddhi ?...</h3>
        <p>Siddhis (Tibetan: དངོས་གྲུབ, Chinese: 悉地, 成就) are spiritual, paranormal, supernatural, or otherwise magical powers, abilities, and attainments that are the products of spiritual advancement through sādhanās such as meditation and yoga.</p>
        <h3>There are 8 Siddhis that you can unlock by using this app.</h3>
        <ul>
          { twentyMinutes }
          { fiveDays }
          { oneHour }
          { tenDays }
          { thirtySessions }
          { fiftySessions }
          { oneHundredHours }
          { complete }
        </ul>
      </div>
    )
  }
})
Component.SiddhisTwentyMinutes = React.createClass({
  render() {
    return (
      <li>
        <p>Completed a 20 minute meditation session</p>
        <h3>The conch shell</h3>
        <img src="/svg/conch.svg"/>
        <p>Immediately after the Buddha’s awakening he realized that, although he himself had seen perfectly and completely the nature of all things, the dharmata which is profound and tranquil and beyond all elaboration, he felt that were he to try to explain this to anyone else, they would be unable to understand it. So he resolved to remain in samadhi (meditation), alone in the forest. After he had remained in samadhi for forty-nine days, the god Indra, who was an emanation of a bodhisattva, appeared in front of the Buddha and offered him a white conch shell with its spiral going clockwise as an offering to encourage the Buddha to teach. It was in response to that first offering that the Buddha decided to turn the dharmachakra, or to teach the dharma.</p>
      </li>
    )
  }
})
Component.SiddhisFiveDays = React.createClass({
  render() {
    return (
      <li>
        <p>Meditated for 5 days in a row</p>
        <h3>Yogurt</h3>
        <img src="/svg/yogurt.svg"/>
        <p>The second auspicious substance is yogurt. This is connected with the Buddha’s teaching that in order to practice dharma properly we need to abandon or transcend two extremes in lifestyle or conduct. One of these extremes is hedonism, in which your goal and your endeavor is to seek as much pleasure as possible—including the acquisition of fine clothes, fine food, and so on. The problem with this extreme is that, if it becomes your goal or obsession, it leaves no time or energy for the practice of dharma. But we also need to abandon the other extreme, which is mortification of the body, because the attempt to attain something through tormenting or depriving your physical body of what it needs does not lead to awakening, and in fact can slow down your progress towards the development of profound wisdom. In order to show by example that it is necessary to abandon the extreme of hedonism, the Buddha left the palace of his father, who was a king, and lived for six years on the banks of the Naranjana River in conditions of utmost austerity. But in order to show that one must also abandon the extreme of mortification, he accepted immediately before his awakening an offering of a mixture of yogurt and extremely condensed milk, which was given to him by a Brahmin woman named Lekshe. Immediately upon his consuming this offering of yogurt, all of the marks and signs of physical perfection which adorn the body of a buddha, which had become somewhat indistinct during his years of austerity, immediately became distinct and resplendent.</p>
      </li>
    )
  }
})
Component.SiddhisOneHour = React.createClass({
  render() {
    return (
      <li>
        <p>Completed a 1 hour session</p>
        <h3>Durva Grass</h3>
        <img src="/svg/durva.svg"/>
        <p>The third auspicious substance is durva grass, which was offered to the Buddha by the grass cutter and seller Tashi meaning auspicious shortly before his awakening, from which he made the mat like seat on which he sat at the time of his awakening.</p>
      </li>
    )
  }
})
Component.SiddhisTenDays = React.createClass({
  render() {
    return (
      <li>
        <p>Meditated for 10 days in a row</p>
        <h3>Vermilion</h3>
        <img src="/svg/vermillion.svg"/>
        <p>The fourth auspicious substance is vermilion. The origin of the auspiciousness of vermilion is this: When the Buddha was in the process of attaining awakening or just about to attain it, Mara appeared and, exhibiting various sorts of unpleasant magical displays in order to obstruct the Buddha, finally challenged him, saying, "You cannot attain awakening; you cannot do this." In response to which the Buddha said, "Yes, I can, because I have completed the two accumulations over three periods of innumerable eons." In response, Mara said, "Well, who is your witness? Who can you bring to prove this?" in response to which the Buddha extended his right hand down past his right knee and touched the earth. The goddess of the earth then appeared out of the earth and, offering the Buddha vermilion, said, “I serve as witness that he has completed the two accumulations throughout these three periods of innumerable eons.”</p>
      </li>
    )
  }
})
Component.SiddhisThirtySessions = React.createClass({
  render() {
    return (
      <li>
        <p>Completed 30 meditation sessions</p>
        <h3>Bilva Fruit</h3>
        <img src="/svg/bilva.svg"/>
        <p>The fifth auspicious substance is bilva fruit. The origin of the auspiciousness of this fruit is that when the Buddha, while living in the palace compound of his father, the king of the Shakyas, first observed the sufferings of birth, aging, sickness, and death and resolved to attain freedom from them, he initially went to the root of a tree and practiced meditation there. During that time he developed a perfect state of shamatha, in acknowledgment of which the goddess or spirit of the tree offered him a bilva fruit.</p>
      </li>
    )
  }
})
Component.SiddhisFiftySessions = React.createClass({
  render() {
    return (
      <li>
        <p>Completed 50 meditation sessions</p>
        <h3>A Mirror</h3>
        <img src="/svg/mirror.svg"/>
        <p>The sixth auspicious substance is a mirror. The origin of the auspiciousness of the mirror is that when the Buddha had received and consumed the yogurt which he was offered by the Brahmin woman Lekshe, his physical form, which had become emaciated from his six years of austerity, was restored to its full vigor and majesty, causing the thirty two marks and eighty signs of physical perfection to be vivid and apparent, in response to which the goddess of form—which in this instance appears to be a goddess of the desire realm gods appeared in front of the Buddha and offered him a mirror so that he could witness his own physical majesty and splendor.</p>
      </li>
    )
  }
})
Component.SiddhisOneHundredHours = React.createClass({
  render() {
    return (
      <li>
        <p>Accumulated 33 hours of meditation time</p>
        <h3>Givam</h3>
        <img src="/svg/medicine.svg"/>
        <p>The seventh auspicious substance is called givam, a medicinal substance that is derived from some part of the body of the elephant—possibly from the elephant’s gall bladder. It is auspicious because it commemorates an occasion long after the Buddha’s awakening when the Buddha’s cousin, Devadatta—who was always attempting to kill or otherwise harm the Buddha and had been doing so for many lives because he was afflicted with great jealousy of the Buddha finally attempted to assassinate the Buddha by sending a mad elephant running out into the path where the Buddha was walking. The Buddha emanated ten lions from his ten fingers, which slowed the elephant down. The elephant then bowed to the Buddha and offered himself, including his body, to the Buddha. Since givam, which is an effective medicine, comes from the body of an elephant, it commemorates that occasion in which the Buddha conquered the aggression of the mad elephant.</p>
      </li>
    )
  }
})
Component.SiddhisComplete = React.createClass({
  render() {
    return (
      <li>
        <p>Finished all the challanges!</p>
        <h3>White Mustard Seed</h3>
        <img src="/svg/seed.svg"/>
        <p>The eighth auspicious substance is white mustard seed, which was offered to the Buddha by Vajrapani on one of the fifteen days during the Buddha’s period of exhibition of miracles. At one time during the Buddha’s lifetime there were six prominent non-Buddhist religious teachers in India. At one point they gathered together and, in order to attempt to discredit the Buddha, they challenged him to a competition of miracles. The Buddha accepted and the competition occurred at the beginning of what is now the first month of the Tibetan and Asian calendars. The Buddha’s exhibition of miracles occurred from the first to the fifteenth day of the first lunar month. For the first eight days, the six other religious teachers competing were still present, but on the eighth day the Buddha scared them off in the following way: From the Buddha’s throne the bodhisattva Vajrapani, accompanied by five fearsome rakshasas, emerged. Seeing that, the six tirthika teachers ran off as fast as they could and did not come back. For the remaining week the Buddha exhibited miracles alone without any competition. When Vajrapani emerged from the Buddha’s throne, he offered the Buddha white mustard seed, which therefore commemorates this occasion.</p>
        <p>
          <small>Text - Khenchen Thrangu Rinpoche, Medicine Buddha Teachings, Snow Lion Publications, ISBN 1-55939-216-9</small>
        </p>
        <p>
          <small>Illustrations - The Eight Auspicious Objects by Jackson Hollomon, Shambhala Publications Inc, ISBN 1-57062-713-4</small>
        </p>
      </li>
    )
  }
})
