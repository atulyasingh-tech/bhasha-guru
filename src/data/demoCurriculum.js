// Rich STEM Curriculum Dataset for Classes 11 & 12
// Fully localized across English, Hindi, Telugu, Hinglish, and Tenglish
// Structured for Foundation, Intermediate, and Advanced tiers

export const DEMO_TOPICS = [
  {
    id: 'archimedes-principle',
    title: "Archimedes' Principle & Buoyancy",
    shortName: "Archimedes' Principle",
    grade: "Class 11",
    subject: "Physics",
    chapter: "Mechanical Properties of Fluids",
    tags: ["Fluids", "Buoyant Force", "Apparent Weight", "Density"],
    formulaLatex: "F_B = \\rho_{fluid} \\cdot V_{displaced} \\cdot g",
    
    // Tiered Layer 1
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "Any body completely or partially submerged in a fluid experiences an upward buoyant force equal to the weight of fluid displaced.",
      
      intuitiveBreakdown: {
        Foundation: {
          English: "Think of pushing a beach ball deep down into a swimming pool. The moment you let go, it shoots right up into the air! Why? Because the water beneath is under higher pressure than the water above. That water wants its space back, pushing the ball up with a force equal to the exact weight of water the ball pushed out of the way.",
          Hinglish: "Imagine karo aap ek lightweight football ko swimming pool ke andar zabardasti push kar rahe ho. Haath chhodte hi ball rocket ki tarah bahar aati hai! Kyun? Kyunki neeche ka paani high pressure me hai aur ball ko upar dhakel raha hai. Yeh upward push hi 'Buoyant Force' hai, jo exactly displaced liquid ke weight ke barabar hota hai.",
          Tenglish: "Oka light plastic ball ni bucket water lo forcefully kinda push cheyyandi. Cheyyi teeseygaane ball paiki bounce avtundi! Endukante kinda unna water pressure ekkuva undi, ball ni upward direction lo nettestundi. Ee upward force ne 'Buoyant Force' antaru, idi displace aina water weight ki exact ga equal ga untundi."
        },
        Intermediate: {
          English: "Buoyant force originates from the hydrostatic pressure gradient: $P(h) = P_0 + \\rho g h$. Because the bottom surface of any submerged body is at a greater depth than the top surface, $P_{bottom} > P_{top}$. The net vertical pressure differential integrated across the surface area yields a net upward thrust: $F_B = \\Delta P \\cdot A = \\rho_{f} V_{disp} g$.",
          Hinglish: "Buoyant force hydrostatic pressure gradient se generate hoti hai: $P(h) = P_0 + \\rho g h$. Submerged object ke bottom face par pressure top face se hamesha zyada hota hai. Net vertical force difference calculate karne par upward thrust nikalta hai: $F_B = \\rho_{f} V_{disp} g$. Exam me apparent weight $W' = W - F_B = mg - \\rho_f V g$ hamesha pucha jaata hai.",
          Tenglish: "Buoyant force fluid hydrostatic pressure gradient valla generate avtundi: $P(h) = P_0 + \\rho g h$. Object kinda surface paina pressure, paina surface kante eppudu ekkuva untundi ($P_{bottom} > P_{top}$). Ee net pressure difference valla upward thrust create avtundi: $F_B = \\rho_{f} V_{disp} g$. Apparent weight formula $W' = W - F_B$ entrance exams lo common ga adugutaru."
        },
        Advanced: {
          English: "In continuum mechanics, the buoyant force is the surface integral of the fluid stress tensor: $\\mathbf{F}_B = -\\oint_{\\partial \\Omega} P \\,\\mathbf{\\hat{n}}\\, dA$. By the Divergence Theorem, this simplifies to $\\int_\\Omega (-\\nabla P)\\, dV$. Since hydrostatic equilibrium requires $\\nabla P = \\rho_f \\mathbf{g}_{eff}$, we obtain $\\mathbf{F}_B = -\\rho_f V \\mathbf{g}_{eff}$. In an accelerated frame with linear acceleration $\\mathbf{a}$, $\\mathbf{g}_{eff} = \\mathbf{g} - \\mathbf{a}$, tilting the buoyant vector antiparallel to effective gravity.",
          Hinglish: "Advanced mechanics me buoyant force surface integral of stress tensor hota hai: $\\mathbf{F}_B = -\\oint_{\\partial \\Omega} P \\,\\mathbf{\\hat{n}}\\, dA$. Gauss Divergence theorem lagane par $\\mathbf{F}_B = -\\rho_f V \\mathbf{g}_{eff}$ banta hai. Accelerated non-inertial frame me effective gravity $\\mathbf{g}_{eff} = \\mathbf{g} - \\mathbf{a}$ hoti hai, jisse buoyant force ka direction effective gravity ke antiparallel tilt ho jaata hai.",
          Tenglish: "Advanced mechanics lo buoyant force fluid stress tensor yokka surface integral: $\\mathbf{F}_B = -\\oint_{\\partial \\Omega} P \\,\\mathbf{\\hat{n}}\\, dA$. Gauss Divergence theorem apply cheste $\\mathbf{F}_B = -\\rho_f V \\mathbf{g}_{eff}$ vastundi. Accelerated frame lo effective gravity $\\mathbf{g}_{eff} = \\mathbf{g} - \\mathbf{a}$ avvadam valla, buoyant force eppudu effective gravity ki opposite direction lo tilt avtundi."
        }
      },

      formalBoardDefinition: "Archimedes' Principle states that when a body is immersed wholly or partially in a fluid at rest, it experiences an upward buoyant force whose magnitude is equal to the weight of the fluid displaced by the body.",
      boardEquations: [
        { label: "Buoyant Force Equation", latex: "F_B = m_{fluid, displaced} \\cdot g = \\rho_{fluid} \\cdot V_{submerged} \\cdot g" },
        { label: "Apparent Weight in Fluid", latex: "W_{apparent} = W_{true} - F_B = V\\rho_{body}g - V\\rho_{fluid}g = V g (\\rho_{body} - \\rho_{fluid})" },
        { label: "Fraction Submerged (Law of Floatation)", latex: "\\frac{V_{submerged}}{V_{total}} = \\frac{\\rho_{body}}{\\rho_{fluid}}" }
      ],
      variableKeys: [
        { symbol: "F_B", meaning: "Upward buoyant force (thrust)", unit: "Newton (N)" },
        { symbol: "\\rho_{fluid}", meaning: "Density of the surrounding liquid/gas", unit: "kg/m³" },
        { symbol: "V_{submerged}", meaning: "Volume of body immersed under the fluid line", unit: "m³" },
        { symbol: "g", meaning: "Local acceleration due to gravity", unit: "9.8 m/s²" },
        { symbol: "W_{apparent}", meaning: "Scale reading when weighed inside the fluid", unit: "Newton (N)" }
      ],
      examSteps: [
        "Step 1: Draw Free Body Diagram (FBD) showing downward gravity $W = m_{body}g$ and upward buoyant force $F_B$.",
        "Step 2: Identify displaced volume $V_{disp}$. If fully immersed, $V_{disp} = V_{body}$. If floating, $V_{disp} < V_{body}$.",
        "Step 3: Calculate $F_B = \\rho_{fluid} \\cdot V_{disp} \\cdot g$. Note: Density is of the FLUID, not of the body!",
        "Step 4: Solve equilibrium: If $F_B = W$, object floats; if $F_B < W$, object sinks to bottom; if $F_B > W$, object accelerates upward."
      ]
    },

    // Layer 2: Real World
    layer2: {
      title: "Live Real-World Application: Naval Submarines & Cargo Shipping",
      applicationTitle: "Ballast Tanks in Submarines & Plimsoll Lines on Transoceanic Cargo Ships",
      caseStudy: {
        English: "How does a 10,000-ton nuclear submarine made of high-density steel dive to 500 meters and return safely? Submarines contain specialized double-hulled 'ballast tanks'. On the surface, the tanks are filled with compressed air, making average density $\\rho_{sub} < \\rho_{sea}$. To dive, flood gates open at the bottom while vents vent air out of the top, letting heavy seawater rush in until $\\rho_{sub} \\approx \\rho_{sea}$ (neutral buoyancy). To surface, high-pressure air compressors blow seawater out through the ballast vents, reducing submarine mass until $F_B > W$. Similarly, massive container ships feature 'Plimsoll Marks' painted on hulls indicating safe loading depths because seawater density varies with salinity and temperature (e.g., Tropical Fresh Water vs. Winter North Atlantic).",
        Hinglish: "10,000 ton ka heavy steel submarine paani ke andar kaise dive karta hai aur wapas upar kaise aata hai? Submarine me specialized 'ballast tanks' hote hain. Surface par in tanks me air bhari hoti hai, jisse overall density paani se kam rehti hai. Dive karne ke liye vents open karke air release karte hain aur heavy seawater bharte hain, jisse $\\rho_{sub} \\approx \\rho_{sea}$ ho jaata hai. Wapas surface aane ke liye compressed air pumps paani ko bahar nikaal dete hain, jisse $F_B > W$ ho jaata hai aur submarine upar tairne lagti hai.",
        Tenglish: "10,000 ton steel submarine ocean lo deep ga dive chesi malli safely surface ki ela vastundo telusa? Submarines lo 'ballast tanks' untayi. Ocean surface paina unnappudu ee tanks lo air untundi, daani valla submarine average density water kante thakkuva untundi. Kinda dive cheyyalante vents open chesi air ni baitaki pampi seawater ni fill chestaru. Re-surface avvalante high-pressure air pumps dwara water ni bayataki push chestaru, appudu Buoyant force weight kante ekkuva ayyi submarine paiki vastundi."
      },
      engineeringDiagramConcept: "Submarine Equilibrium: W_sub vs F_B (Ballast Venting vs Blowing)",
      realWorldExamples: [
        "Submarine Ballast Control (Neutral buoyancy navigation)",
        "Plimsoll Marks on Ocean Freighters (Accounting for water salinity differences)",
        "Hydrometers for milk purity (Lactometer) and automotive battery acid density",
        "Hot Air Balloons (Displacing cooler high-density ambient air with warm low-density air)"
      ]
    },

    // Layer 3: Origin Story
    layer3: {
      title: "Origin Story: The Gold Crown Fraud & The Bath of Syracuse (250 BCE)",
      hero: "Archimedes of Syracuse",
      era: "circa 250 BCE, Magna Graecia (Sicily)",
      narrative: {
        English: "King Hiero II of Syracuse had commissioned a goldsmith to forge a votive crown of pure gold for a temple. When the crown arrived, Hiero suspected the artisan had embezzled a portion of the royal gold and substituted cheaper, lower-density silver, melting them together without changing the weight. However, Hiero ordered Archimedes to verify the crown's purity without melting, cutting, or damaging the sacred crown. Archimedes pondered the problem for weeks. One day, stepping into a brim-full communal bathtub, he watched the water spill over the rim onto the stone floor. He suddenly recognized that the volume of displaced water was precisely equal to the submerged volume of his own body! Knowing gold is nearly twice as dense as silver ($19.3 \\text{ g/cm}^3$ vs $10.5 \\text{ g/cm}^3$), an adulterated crown of equal mass must have a greater volume and displace more water than pure gold. Overwhelmed with ecstasy, he leapt from the bath and sprinted completely naked through Syracuse shouting: 'Eureka! Eureka!' (I have found it!).",
        Hinglish: "King Hiero II ne ek sunar ko mandir ke liye pure gold ka crown banane diya. Jab crown tayar hua, King ko shaq hua ki sunar ne thoda gold chori karke cheap silver mila diya hai. Par condition yeh thi ki crown ko bina todhe, bina pighlaye sach pata karna tha. Archimedes hafte tak pareshan rahe. Ek din jab woh brim-full public bathtub me ghuse, unhone dekha paani bahar chhalak gaya. Unhe turant realize hua ki jitna volume unke body ka paani me gaya, utna hi water bahar nikla! Pure gold ki density silver se double hoti hai, toh impure crown zyada water displace karega. Khushi ke maare Archimedes bina kapdo ke sadak par daude chillate hue: 'Eureka! Eureka!' (Maine dhoondh liya!).",
        Tenglish: "Syracuse raju Hiero II oka golden crown tayaru cheyincharu. Kaani goldsmith gold ni donga chesi silver kalipadani rajuki doubt vachindi. Kireetam ni padugottina kunda, karchakunda purity test cheyyamani Archimedes ki aadeshincharu. Archimedes chala rojulu aalochincharu. Oka roju full ga water unna bathtub lo diginappudu, paiki water overflow avvadam gamanincharu. Submerge aina body volume ki equal ga water displace avtundani aayana realize ayyaru! Gold density silver kante double untundi, kabatti adulterated crown ekkuva water ni displace chestundi. Aanandam tho aayana bathtub nunchi battalu lekunda Syracuse veedhuloki uriki 'Eureka! Eureka!' (Nenu kanukkunnanu!) ani aripoyaru."
      },
      epiphanyKey: "Conservation of Volume: An irregular solid placed in liquid displaces its exact spatial volume, revealing density without destructive melting."
    },

    // Layer 4: Beyond the Horizon
    layer4: {
      title: "Beyond the Horizon: The Microgravity & Accelerated Lift Paradox",
      paradoxQuestion: "What happens to the buoyant force on a submerged wooden sphere inside a beaker of water if the entire elevator cable snaps and it goes into free fall ($a = g$)? Does the wood float, sink, or remain suspended?",
      hint: "Examine the effective gravity in the non-inertial frame of the free-falling elevator.",
      explanation: {
        English: "In free fall, the apparent gravity inside the elevator becomes $g_{eff} = g - a = g - g = 0$. Since buoyant force is $F_B = \\rho V g_{eff}$, the buoyant force drops to EXACTLY ZERO! The hydrostatic pressure gradient vanishes ($dP/dh = \\rho g_{eff} = 0$). Therefore, the water exerts no net upward thrust on the wood. The wooden sphere remains completely stationary wherever it was placed, neither rising nor sinking relative to the water!",
        Hinglish: "Free fall me elevator ke andar effective gravity $g_{eff} = g - a = 0$ ho jaati hai. Buoyant force $F_B = \\rho V g_{eff}$ bhi ZERO ho jaata hai! Paani ke andar koi pressure gradient nahi rehta. Isliye wooden ball na upar aayegi, na neeche jayegi — jahan chhodoge wahin float/suspend rahegi!",
        Tenglish: "Free fall lo elevator lopala effective gravity $g_{eff} = g - a = 0$ aipothundi. $F_B = \\rho V g_{eff}$ formula prakaram Buoyant force ZERO avtundi. Liquid lo pressure gradient undadu. Anduvalla wood sphere paiki raadu, kinda padadu — liquid lo ekkada unchithe akkade freeze ainattu undipotundi!"
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "The wood shoots out with double speed because gravity disappeared.", isCorrect: false, feedback: "Incorrect! Buoyant force requires pressure differences created by gravity." },
        { id: 'b', text: "The buoyant force becomes ZERO; the wood stays suspended in place.", isCorrect: true, feedback: "Mastery Confirmed! In zero-g or free fall, hydrostatic pressure differential vanishes ($dP/dz = 0$), so $F_B = 0$." },
        { id: 'c', text: "The wood sinks to the bottom because water becomes weightless.", isCorrect: false, feedback: "Incorrect. The wood also becomes weightless ($W' = 0$), so there is no net force pulling it down either." }
      ]
    },

    // Interactive Derivation & Challenge Numerical (Tier 5)
    derivationChallenge: {
      question: "A solid cube of wood of edge $10\\text{ cm}$ and density $700\\text{ kg/m}^3$ floats in water of density $1000\\text{ kg/m}^3$. Calculate the depth $h$ of the submerged portion and the additional mass that must be placed on top of the block so it is just fully submerged.",
      steps: [
        { step: 1, title: "Equilibrium condition for floatation", formula: "W_{block} = F_B \\implies V_{total} \\rho_{wood} g = (A \\cdot h) \\rho_{water} g" },
        { step: 2, title: "Calculate submerged depth $h$", formula: "h = L \\cdot \\frac{\\rho_{wood}}{\\rho_{water}} = 10\\text{ cm} \\times \\frac{700}{1000} = 7.0\\text{ cm}" },
        { step: 3, title: "Additional mass for full submersion", formula: "m_{extra} = V_{total}(\\rho_{water} - \\rho_{wood}) = (0.1)^3 \\times (1000 - 700) = 0.001 \\times 300 = 0.3\\text{ kg} = 300\\text{ g}" }
      ],
      targetAnswer: "7 cm depth, 300 g extra mass"
    },

    // Module D: Retention Module 3-Question Twisted Revision Quiz
    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Core Definition & Formula)',
        question: "An iron anchor of volume $0.05\\text{ m}^3$ is completely submerged in sea water (density $1030\\text{ kg/m}^3$). What is the buoyant force acting on it? (Take $g = 9.8\\text{ m/s}^2$)",
        options: [
          { label: "A", text: "504.7 N", isCorrect: true },
          { label: "B", text: "385.0 N", isCorrect: false },
          { label: "C", text: "51.5 N", isCorrect: false },
          { label: "D", text: "1030 N", isCorrect: false }
        ],
        explanation: "$F_B = \\rho_{fluid} \\cdot V_{disp} \\cdot g = 1030\\text{ kg/m}^3 \\times 0.05\\text{ m}^3 \\times 9.8\\text{ m/s}^2 = 504.7\\text{ N}$. Remember: Always use fluid density, never anchor density!"
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Altered Conditions)',
        question: "A beaker containing water with a piece of ice floating in it is placed in an elevator accelerating upwards with an acceleration $a = 2\\text{ m/s}^2$. What happens to the fraction of ice submerged?",
        options: [
          { label: "A", text: "Submerged fraction increases because downward inertia increases.", isCorrect: false },
          { label: "B", text: "Submerged fraction decreases because buoyant force shoots up.", isCorrect: false },
          { label: "C", text: "Submerged fraction remains strictly UNCHANGED.", isCorrect: true },
          { label: "D", text: "Ice completely sinks to the floor of the beaker.", isCorrect: false }
        ],
        explanation: "Twisted Trap! In the accelerating frame, $g_{eff} = g + a$. Weight becomes $V_{ice}\\rho_{ice}(g+a)$ and buoyant force is $V_{sub}\\rho_{water}(g+a)$. The $(g+a)$ term cancels on both sides: $\\frac{V_{sub}}{V_{ice}} = \\frac{\\rho_{ice}}{\\rho_{water}}$, which is completely independent of acceleration!"
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Student Reasoning Trap)',
        question: "A heavy steel block and a light cork block of the EXACT SAME VOLUME ($100\\text{ cm}^3$) are both held completely submerged underwater. Which block experiences the greater buoyant force?",
        options: [
          { label: "A", text: "The heavy steel block, because it is much heavier and denser.", isCorrect: false },
          { label: "B", text: "The light cork block, because it wants to rush to the surface.", isCorrect: false },
          { label: "C", text: "BOTH experience EXACTLY the same buoyant force.", isCorrect: true },
          { label: "D", text: "Neither, because steel sinks and cork cannot be fully submerged.", isCorrect: false }
        ],
        explanation: "Classic Student Misconception Trap! Archimedes' Principle states $F_B = \\rho_{water} \\cdot V_{displaced} \\cdot g$. Since both blocks have the exact same volume ($100\\text{ cm}^3$) and are fully submerged, both displace the exact same mass of water. Hence, both experience identical buoyant force! The steel sinks only because its weight exceeds $F_B$."
      }
    ]
  },

  {
    id: 'lenzs-law',
    title: "Lenz's Law & Electromagnetic Induction",
    shortName: "Lenz's Law",
    grade: "Class 12",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    tags: ["Electromagnetism", "Faraday's Law", "Conservation of Energy", "Eddy Currents"],
    formulaLatex: "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -N \\frac{d(B \\cdot A \\cos\\theta)}{dt}",
    
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "The direction of induced EMF and current always opposes the very change in magnetic flux that produces it.",
      
      intuitiveBreakdown: {
        Foundation: {
          English: "Imagine nature has a stubborn 'resistance to change' policy. If you bring the North pole of a magnet toward a copper ring, the ring gets angry and creates its own North pole right in front to repel your magnet! If you try to pull the magnet away, the ring switches and creates a South pole to pull you back. It always fights whatever you do!",
          Hinglish: "Nature ka ek golden rule hai: 'Jo change laane ki koshish karoge, nature uska virodh karegi'. Agar aap kisi coil ke paas magnet ka North pole le jaoge, coil apne face par North pole generate karegi taaki magnet repel ho. Agar magnet ko door le jaoge, coil South pole bana legi taaki magnet ruk jaye. Yeh stubborn resistance hi Lenz's Law hai!",
          Tenglish: "Nature lo changes ni oppose chese stubborn rule untundi. Oka copper ring daggarki magnet North pole teesukoste, aa ring kuda tanalo North pole induce chesukuni magnet ni repel chestundi! Ade magnet ni dooram ga teesukelthe, ring South pole ga maari magnet ni attract chestundi. Ee opposition ne manam Lenz's Law antamu!"
        },
        Intermediate: {
          English: "Lenz's Law is nature's enforcement of the Law of Conservation of Energy in electromagnetics. In Faraday's law $\\mathcal{E} = -d\\Phi_B/dt$, the negative sign IS Lenz's Law. If the induced current assisted the change rather than opposing it, moving a magnet slightly would induce current that pulls the magnet faster, generating infinite kinetic and electrical energy from nothing!",
          Hinglish: "Lenz's Law असल me Law of Conservation of Energy ka reflection hai. Faraday's formula $\\mathcal{E} = -d\\Phi_B/dt$ me jo minus (-) sign hai, wahi Lenz's law hai. Agar minus sign nahi hota, toh magnet ko thoda sa push karne par induced current magnet ko aur tezi se kheenchta, aur bina kisi external work ke free electrical energy create ho jaati, jo impossible hai!",
          Tenglish: "Lenz's Law anedi Conservation of Energy yokka direct manifestation. Faraday's law $\\mathcal{E} = -d\\Phi_B/dt$ lo unna negative (-) sign ee Lenz's Law ni represent chestundi. Oka vela ee opposition lekapothe, magnet ni light ga move cheste induced current inka speed ga laagi, external work cheyakundane infinite energy generate ayyedi, which violates physics laws!"
        },
        Advanced: {
          English: "Maxwell-Faraday differential equation $\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$ dictates that a time-varying magnetic field establishes a non-conservative, curly electric field. For a conducting loop with resistance $R$ and self-inductance $L$, the governing dynamical equation is $L\\frac{di}{dt} + Ri = -\\frac{d\\Phi_{ext}}{dt}$. The magnetic force on the moving source $\\mathbf{F} = \\int (I d\\mathbf{l} \\times \\mathbf{B})$ always does negative mechanical work, quantitatively matching Joule heating dissipation $\\int I^2 R\\, dt$.",
          Hinglish: "Maxwell equation $\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$ show karta hai ki changing magnetic field ek non-conservative curly electric field banata hai. Moving magnet par lagne wala magnetic force $\\mathbf{F} = \\int (I d\\mathbf{l} \\times \\mathbf{B})$ hamesha negative mechanical work karta hai, jo circuit ke Joule heating dissipation $I^2 R$ ke exact barabar hota hai.",
          Tenglish: "Maxwell's curl equation $\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$ time-varying magnetic field valla non-conservative curly electric field generate avtundani chebutundi. Moving magnet paina act chese magnetic force $\\mathbf{F} = \\int (I d\\mathbf{l} \\times \\mathbf{B})$ eppudu negative mechanical work chestundi, idi circuit lo produce ayye Joule heating $I^2 R$ loss ki exact ga equal untundi."
        }
      },

      formalBoardDefinition: "Lenz's Law states that the polarity of induced electromotive force (EMF) is always such that it produces a current whose magnetic field opposes the change in magnetic flux which produces it.",
      boardEquations: [
        { label: "Faraday-Lenz Law", latex: "\\mathcal{E} = -N \\frac{d\\Phi_B}{dt} = -N \\frac{d}{dt}(B A \\cos\\theta)" },
        { label: "Induced Current", latex: "I = \\frac{|\\mathcal{E}|}{R} = \\frac{1}{R} \\left| -N \\frac{d\\Phi_B}{dt} \\right|" },
        { label: "Induced Charge Flow", latex: "\\Delta Q = \\int I\\, dt = \\frac{\\Delta \\Phi_B}{R} \\quad \\text{(Independent of time interval!)}" }
      ],
      variableKeys: [
        { symbol: "\\mathcal{E}", meaning: "Induced electromotive force", unit: "Volt (V)" },
        { symbol: "\\Phi_B", meaning: "Magnetic flux ($B \\cdot A \\cos\\theta$)", unit: "Weber (Wb) or T·m²" },
        { symbol: "N", meaning: "Number of turns in the coil", unit: "dimensionless" },
        { symbol: "R", meaning: "Electrical resistance of the loop", unit: "Ohm (Ω)" }
      ],
      examSteps: [
        "Step 1: Determine initial magnetic field direction $\\mathbf{B}$ passing through the loop.",
        "Step 2: Check if flux is INCREASING or DECREASING with time.",
        "Step 3: Apply Lenz's rule: If flux is increasing, induced field $\\mathbf{B}_{ind}$ opposes external field; if decreasing, $\\mathbf{B}_{ind}$ supports external field.",
        "Step 4: Use Right-Hand Thumb Rule: Curl fingers in current direction, thumb points to induced magnetic field."
      ]
    },

    layer2: {
      title: "Live Real-World Application: Bullet Train Magnetic Brakes & Induction Stoves",
      applicationTitle: "Eddy Current Regenerative Braking & Maglev Suspension",
      caseStudy: {
        English: "High-speed bullet trains (like Japan's Shinkansen and French TGV) cruising at 320 km/h cannot rely on mechanical friction pads alone, which would melt and wear out instantaneously. Instead, they deploy electromagnetic eddy-current brakes. Strong electromagnets are lowered adjacent to the solid steel rails. As the train moves over the rails, the rails experience a rapidly changing magnetic flux. By Lenz's law, massive circular swirl currents ('Eddy Currents') are induced in the rail. These eddy currents generate their own magnetic fields that oppose the motion of the train's magnets. This produces an intense, smooth braking force with zero mechanical contact, zero friction, and zero brake pad wear! The train's kinetic energy is safely dissipated as thermal energy in the rail steel.",
        Hinglish: "320 km/h ki speed se daudne wali Shinkansen Bullet Train normal brake pads se nahi ruk sakti, kyunki friction se pads pighal jayenge. Iske bajaye train 'Eddy Current Brakes' use karti hai. Train ke neeche powerful electromagnets rail tracks ke paas aate hain. Rail metal me rapidly changing magnetic flux se heavy swirling currents (Eddy currents) bante hain. Lenz's law ke hisab se yeh eddy currents train ke motion ko oppose karte hain, jisse train bina kisi physical contact ya friction ke smoothly slow ho jaati hai!",
        Tenglish: "320 km/h speed tho velley Bullet Trains ordinary brake pads tho aagaleru, endukante friction valla heat generate ayyi pads melt aipothayi. Anduke 'Eddy Current Braking' technology vadatharu. Electromagnets ni rail tracks daggarki tecchinappudu, rails lo intense swirling eddy currents generate avtayi. Lenz's law valla ee eddy currents train movement ni oppose chesi, mechanical contact lekundane train ni safe ga and smoothly aapesthayi."
      },
      engineeringDiagramConcept: "Magnetic Rail Induction: B_ext vs Eddy Current Loop B_ind Braking Force",
      realWorldExamples: [
        "High-Speed Bullet Train contactless braking",
        "Rollercoaster fail-safe magnetic drop brakes (require no electricity!)",
        "Kitchen Induction Cooktops (Eddy currents heat ferromagnetic pan directly)",
        "Dead-beat Galvanometers (Eddy currents prevent needle oscillation)"
      ]
    },

    layer3: {
      title: "Origin Story: Heinrich Lenz & The Mystery of Negative Sign (1834)",
      hero: "Heinrich Friedrich Emil Lenz",
      era: "1834, University of Saint Petersburg, Russian Empire",
      narrative: {
        English: "In 1831, Michael Faraday published his epochal discovery of electromagnetic induction: moving a magnet induces voltage. But experimentalists across Europe were deeply confused: sometimes the galvanometer needle deflected to the left, sometimes to the right. No one could formulate a predictive law determining which way current would circulate. In 1834, German-Russian physicist Heinrich Lenz carried out meticulous experiments with ballistic galvanometers. He realized that whenever he moved a magnet toward a coil, he felt a tangible physical mechanical resistance pushing back against his hand! Lenz recognized that this opposing force wasn't a flaw — it was an absolute physical necessity. If the current did not oppose his motion, you could create perpetual motion and free energy. Lenz boldly formulated his law, adding the pivotal negative sign to Faraday's formulation.",
        Hinglish: "1831 me Michael Faraday ne induction discover kiya, par European scientists confuse the ki induced current kis direction me bahegi — kabhi left, kabhi right. 1834 me Heinrich Lenz ne experiments karte waqt notice kiya ki jab bhi woh magnet ko coil ke paas dhakelte the, unke haath par ek physical repulsive force mehsoos hota tha! Lenz ne samjha ki yeh virodh nature ka law hai. Agar virodh nahi hoga, toh bina mechanical work ke free energy ban jayegi. Unhone Faraday ke formula me negative (-) sign jodkar physics ka itihaas badal diya.",
        Tenglish: "1831 lo Michael Faraday induction ni discover chesinappudu, induced current ae direction lo flow avtundo evariki theleka confusion lo undevaru. 1834 lo Heinrich Lenz experiment chestunappudu, coil daggarki magnet ni tosinappudu cheyyiki oka repulsive mechanical resistance tagulutundani kanugonnaru! Ee resistance lekapothe free energy generate avtundani, idi Law of Conservation of Energy ni uphold chestundani aayana realize ayyaru. Faraday formula ki minus sign add chesi Lenz's law ga formulate chesaru."
      },
      epiphanyKey: "Conservation of Energy: You cannot extract electrical energy from an induction coil without doing mechanical work against the induced opposing magnetic force."
    },

    layer4: {
      title: "Beyond the Horizon: The Superconducting Magnet Cannon Paradox",
      paradoxQuestion: "If you drop a strong Neodymium magnet through a vertical thick copper pipe at room temperature, it falls very slowly at terminal velocity due to eddy currents. WHAT HAPPENS if you cool the copper pipe down to liquid helium temperature (4 Kelvin) so it becomes a zero-resistance superconductor?",
      hint: "Recall that in a perfect superconductor, electrical resistance $R = 0$ and magnetic flux cannot penetrate (Meissner effect).",
      explanation: {
        English: "In a superconductor ($R = 0$), eddy currents encounter ZERO resistance and do not decay! As the magnet enters, induced screening currents are generated with magnitude exactly sufficient to prevent any net change in magnetic flux inside the tube. Because no electrical energy is dissipated as heat ($I^2 R = 0$), the upward repulsive magnetic force equals the gravitational pull immediately, and the magnet levitates indefinitely above the pipe opening! It bounces on the invisible magnetic field cushion and never falls through!",
        Hinglish: "Superconductor me resistance $R = 0$ hota hai, isliye eddy currents kabhi dissipate nahi hote. Magnet jaise hi pipe ke paas aayega, induced currents bina kisi energy loss ke itna powerful opposing field banayenge ki magnet pipe ke andar girega hi nahi! Magnet pipe ke mukh par hawa me levitate karne lagega!",
        Tenglish: "Superconductor lo resistance $R = 0$ kabatti eddy currents asalu die out avvavu. Magnet pipe loki enter avvagane induced currents instant ga maximum opposition create chestayi. Energy heat ga dissipate avvadu kabatti, magnet pipe lopala padakunda, invisible magnetic field paina hawa lo levitate avtundi!"
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "The magnet falls infinitely faster because cold air reduces drag.", isCorrect: false, feedback: "Incorrect. Eddy current forces dominate aerodynamic drag by thousands of times." },
        { id: 'b', text: "The magnet stops completely and levitates stably above the tube entrance.", isCorrect: true, feedback: "Beyond Thinking Mastered! With $R=0$, persistent shielding currents provide 100% flux exclusion, creating permanent magnetic levitation!" },
        { id: 'c', text: "The copper tube melts instantly due to immense induced voltage.", isCorrect: false, feedback: "Incorrect. Without electrical resistance ($R=0$), Joule heat dissipation $P = I^2 R = 0$, so no heat is generated." }
      ]
    },

    derivationChallenge: {
      question: "A square metallic loop of side $L = 20\\text{ cm}$ and total resistance $R = 2.0\\,\\Omega$ is pulled out of a uniform transverse magnetic field $B = 0.5\\text{ T}$ at constant velocity $v = 10\\text{ m/s}$. Calculate the induced EMF, induced current, and external mechanical power required.",
      steps: [
        { step: 1, title: "Motional EMF on the leading wire", formula: "\\mathcal{E} = B \\cdot L \\cdot v = 0.5\\text{ T} \\times 0.2\\text{ m} \\times 10\\text{ m/s} = 1.0\\text{ V}" },
        { step: 2, title: "Induced Current circulating in loop", formula: "I = \\frac{\\mathcal{E}}{R} = \\frac{1.0\\text{ V}}{2.0\\,\\Omega} = 0.5\\text{ A}" },
        { step: 3, title: "Magnetic braking force & mechanical power", formula: "F_{ext} = I L B = 0.5 \\times 0.2 \\times 0.5 = 0.05\\text{ N} \\implies P_{mech} = F_{ext} \\cdot v = 0.05 \\times 10 = 0.50\\text{ W} = I^2 R" }
      ],
      targetAnswer: "EMF = 1.0 V, Current = 0.5 A, Power = 0.50 W"
    },

    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Core Formula & Sign)',
        question: "In the formula $\\mathcal{E} = -N \\frac{d\\Phi_B}{dt}$, what fundamental conservation law is represented by the negative sign?",
        options: [
          { label: "A", text: "Conservation of Linear Momentum", isCorrect: false },
          { label: "B", text: "Conservation of Energy", isCorrect: true },
          { label: "C", text: "Conservation of Electric Charge", isCorrect: false },
          { label: "D", text: "Conservation of Angular Momentum", isCorrect: false }
        ],
        explanation: "The negative sign is the mathematical statement of Lenz's Law, ensuring that the induced EMF does not violate the Conservation of Energy."
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Geometric Trick)',
        question: "A closed circular aluminium ring is suspended horizontally from a silk thread. A bar magnet is dropped vertically straight through the ring with its North pole pointing down. What is the acceleration $a$ of the magnet while falling into the ring?",
        options: [
          { label: "A", text: "$a = g$ (normal free fall)", isCorrect: false },
          { label: "B", text: "$a > g$ (drawn faster by induction)", isCorrect: false },
          { label: "C", text: "$a < g$ (slowed by upward induced magnetic repulsion)", isCorrect: true },
          { label: "D", text: "$a = 0$ (instantly stops at the ring plane)", isCorrect: false }
        ],
        explanation: "As the North pole approaches, the ring induces a counter-clockwise current creating an upward North pole that repels the incoming magnet. Thus, net downward force $F_{net} = mg - F_{mag} < mg$, so $a < g$."
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Cut Loop Trap)',
        question: "Suppose the aluminium ring in the previous question has a tiny cut (open circuit). The same bar magnet is dropped through it. What is the acceleration $a$ now?",
        options: [
          { label: "A", text: "$a < g$, because induced EMF still exerts magnetic force.", isCorrect: false },
          { label: "B", text: "$a = g$, because no continuous current can flow to produce an opposing magnetic field.", isCorrect: true },
          { label: "C", text: "$a > g$, because voltage accumulates at the cut ends.", isCorrect: false },
          { label: "D", text: "The magnet sparks across the cut and bounces back.", isCorrect: false }
        ],
        explanation: "Common Exam Trap! With a cut, induced EMF is still generated across the gap (Faraday's law holds), but because the circuit is broken ($R = \\infty$), induced current $I = 0$. With zero current, no magnetic field is produced to repel the magnet, so it falls with pure gravitational acceleration $a = g$!"
      }
    ]
  },

  {
    id: 'bernoullis-principle',
    title: "Bernoulli's Principle & Dynamic Lift",
    shortName: "Bernoulli's Principle",
    grade: "Class 11",
    subject: "Physics",
    chapter: "Mechanical Properties of Fluids",
    tags: ["Fluid Dynamics", "Conservation of Energy", "Aerodynamics", "Venturi Tube"],
    formulaLatex: "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}",
    
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "For an incompressible, non-viscous streamline fluid flow, the total mechanical energy (pressure energy + kinetic energy + potential energy per unit volume) remains constant along any streamline.",
      
      intuitiveBreakdown: {
        Foundation: {
          English: "Imagine you are holding two lightweight sheets of paper hanging parallel in your hands. If you blow air forcefully BETWEEN the two sheets, what happens? Most students guess the sheets will blow apart. But surprise! They slap together tightly! Why? Because fast-moving air has lower pressure than the still room air outside. The high outside pressure pushes them inward.",
          Hinglish: "Do paper ke sheets ko paas pakad kar beech me zorse foonk maaro. Aapko lagega dono sheets door jayengi, par woh aapas me chipak jaati hain! Kyun? Kyunki tez daudti hawa ka pressure low ho jaata hai, aur bahar ka normal atmospheric pressure unhe andar ki taraf daba deta hai. Fast speed = Low pressure!",
          Tenglish: "Rendu papers ni daggaraga patti madhyalo gattiga gaali voodhandi. Papers dooram pothayani anukuntaru, kaani avi okadaanikokati daggarki vachi antukuntayi! Endukante fast ga move ayye fluid pressure thakkuva untundi. Bayata unna still air high pressure tho papers ni madhyaloki push chestundi."
        },
        Intermediate: {
          English: "Bernoulli's theorem represents work-energy theorem applied to fluid elements: $P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g h_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g h_2$. Combined with the Continuity Equation $A_1 v_1 = A_2 v_2$, whenever cross-sectional area constricts, velocity must rise ($v_2 > v_1$), which strictly forces static pressure to drop ($P_2 < P_1$).",
          Hinglish: "Bernoulli's equation fluids ke liye Work-Energy theorem hai: $P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{const}$. Continuity equation $A_1 v_1 = A_2 v_2$ ke saath, jab pipe patla hota hai toh fluid velocity badhti hai, jisse static pressure kam ho jaata hai. Issi principle se carburetor aur perfume atomizers kaam karte hain.",
          Tenglish: "Bernoulli's theorem fluids lo Work-Energy theorem apply chesinatlu: $P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}$. Continuity equation $A_1 v_1 = A_2 v_2$ prakaram cross-section area taggithe velocity perugutundi, appudu static pressure thaggipotundi."
        },
        Advanced: {
          English: "Derived from Euler's momentum equation for inviscid barotropic flow: $\\frac{\\partial \\mathbf{v}}{\\partial t} + (\\mathbf{v} \\cdot \\nabla)\\mathbf{v} = -\\frac{1}{\\rho}\\nabla P + \\mathbf{g}$. Using vector identity $(\\mathbf{v} \\cdot \\nabla)\\mathbf{v} = \\nabla\\left(\\frac{1}{2}v^2\\right) + (\\nabla \\times \\mathbf{v}) \\times \\mathbf{v}$, integration along a streamline (where $d\\mathbf{r} \\parallel \\mathbf{v}$) causes the vorticity cross-product term to vanish identically, yielding the exact Bernoulli invariant.",
          Hinglish: "Inviscid flow ke liye Euler momentum equation $\\rho (\\mathbf{v} \\cdot \\nabla)\\mathbf{v} = -\\nabla P + \\rho \\mathbf{g}$ ko streamline ke along integrate karne par vorticity term zero ho jaata hai aur Bernoulli invariant derive hota hai.",
          Tenglish: "Inviscid fluid flows kosam Euler equation ni streamline path lo line integral chesinappudu vorticity component zero ayyi Bernoulli relation exact ga satisfy avtundi."
        }
      },

      formalBoardDefinition: "Bernoulli's Principle states that for the steady, irrotational, streamline flow of an ideal (incompressible and non-viscous) fluid, the sum of pressure energy, kinetic energy, and potential energy per unit volume remains constant at every point along the streamline.",
      boardEquations: [
        { label: "Bernoulli's Formula", latex: "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}" },
        { label: "Pressure Head + Velocity Head + Datum Head", latex: "\\frac{P}{\\rho g} + \\frac{v^2}{2g} + h = \\text{Total Head (constant in metres)}" },
        { label: "Torricelli's Law of Efflux", latex: "v = \\sqrt{2 g h}" }
      ],
      variableKeys: [
        { symbol: "P", meaning: "Static fluid pressure", unit: "Pascal (N/m²)" },
        { symbol: "\\rho", meaning: "Fluid density", unit: "kg/m³" },
        { symbol: "v", meaning: "Streamline flow velocity", unit: "m/s" },
        { symbol: "h", meaning: "Height above reference datum", unit: "metre (m)" }
      ],
      examSteps: [
        "Step 1: Check if flow is ideal: Steady, incompressible, irrotational, non-viscous.",
        "Step 2: Apply Continuity Equation $A_1 v_1 = A_2 v_2$ to relate velocities at two cross-sections.",
        "Step 3: Write Bernoulli between Point 1 and Point 2: $P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g h_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g h_2$.",
        "Step 4: Cancel identical heights if the pipe is horizontal ($h_1 = h_2$) to solve for $\\Delta P = \\frac{1}{2}\\rho(v_2^2 - v_1^2)$."
      ]
    },

    layer2: {
      title: "Live Real-World Application: Aeroplane Wings (Aerofoil Lift) & Cricket Swing",
      applicationTitle: "Dynamic Aerodynamic Lift & The Magnus Effect in Reverse Swing",
      caseStudy: {
        English: "How does a 400-ton Boeing 747 leave the runway? Its wing has an asymmetric cambered cross-section called an 'aerofoil'. The upper surface is curved, while the lower surface is relatively flat. As the aircraft thunders forward, air divides at the leading edge. The streamline curvature forces air over the top surface to accelerate to higher velocities ($v_{top} > v_{bottom}$). By Bernoulli's principle, this high velocity creates a low-pressure zone on the upper wing surface ($P_{top} < P_{bottom}$). The net upward pressure difference multiplied by the massive wing area generates tons of aerodynamic lift force! Similarly, when a cricket bowler shines one side of a leather ball and delivers it with seam rotation, air speeds up on the rough side, creating a sideways pressure drop that makes the ball swing unexpectedly in mid-air (Magnus Effect).",
        Hinglish: "400 ton ka Boeing 747 hawa me kaise udta hai? Aeroplane ke wing ka special shape 'aerofoil' kehlata hai. Wing ke upar ka surface curved hota hai, jisse upar se guzarne wali hawa ki speed fast ho jaati hai ($v_{top} > v_{bottom}$). Bernoulli's principle ke hisab se upar pressure drop ho jaata hai ($P_{top} < P_{bottom}$). Kinda se higher pressure wing ko upar dhakelta hai aur flight ko massive dynamic lift milti hai!",
        Tenglish: "Boeing 747 flight hawa lo ela float avtundi? Flight wing shape 'aerofoil' antaru. Wing paina surface curve ga undadam valla gaali speed ekkuva avtundi. Bernoulli theorem prakaram paina pressure drop ayyi kinda high pressure create avtundi. Ee pressure difference valla flight paiki lechuthundi."
      },
      engineeringDiagramConcept: "Aerofoil Camber: v_upper > v_lower -> P_upper < P_lower -> Net Dynamic Lift",
      realWorldExamples: [
        "Aeroplane Wing Camber & Flap Deployment during Takeoff",
        "Magnus Effect in swinging cricket balls & curving football free-kicks",
        "Venturi meter in chemical pipelines & carburetor fuel delivery",
        "Atomizer spray bottles & modern perfume dispensers"
      ]
    },

    layer3: {
      title: "Origin Story: Daniel Bernoulli & The Hydrodynamica Masterpiece (1738)",
      hero: "Daniel Bernoulli",
      era: "1738, Basel & Saint Petersburg Academy of Sciences",
      narrative: {
        English: "Daniel Bernoulli was born into the legendary Bernoulli mathematical dynasty in Switzerland. His father, Johann Bernoulli, was notoriously competitive and jealous. In 1738, Daniel published 'Hydrodynamica', proposing that fluids consist of countless invisible corpuscles (molecules) colliding with pipe walls. He connected conservation of mechanical energy with fluid pressure for the first time. Bitterly jealous of his son's fame, Johann backdated his own book 'Hydraulica' to 1732 to falsely claim priority! Despite family treachery, Daniel's elegant formulation connecting kinetic head and pressure head became the foundational cornerstone of all modern aeronautics and naval architecture.",
        Hinglish: "Daniel Bernoulli Switzerland ki famous mathematical family se the. 1738 me unhone 'Hydrodynamica' book publish ki jisme unhone pehli baar fluid speed aur pressure ke energy conservation ko connect kiya. Unke father Johann Bernoulli itne jealous the ki unhone apni book 'Hydraulica' par 1732 ki jhooti date likhkar credit lene ki koshish ki! Par Daniel ki equation ne aage chalkar aviation industry ki neev rakhi.",
        Tenglish: "Daniel Bernoulli 1738 lo 'Hydrodynamica' aney book publish chesi, fluid motion and pressure energy conservation ni connect chesaru. Aayana father Johann Bernoulli jealousy tho thana book paina fake date vesi credit kottadaniki try chesaru. Kaani Daniel Bernoulli formula modern aviation and aerodynamics ki main foundation ga nilichindi."
      },
      epiphanyKey: "Energy Invariance: A fluid particle cannot speed up on its own; work must be done on it by surrounding pressure differences."
    },

    layer4: {
      title: "Beyond the Horizon: The High-Speed Train Platform Trap",
      paradoxQuestion: "Why are passengers strictly warned by yellow safety lines on railway platforms never to stand near a fast-moving express train (130 km/h), even if the train is not physically touching them?",
      hint: "Consider the velocity of the air layer trapped between the passenger's chest and the speeding train body.",
      explanation: {
        English: "As the train rockets past at 130 km/h, viscous drag drags the air layer adjacent to the train at near train speed. By Bernoulli's principle, this narrow corridor of high-velocity air suffers a severe pressure collapse ($P_{between} \\ll P_{atm}$). Behind the passenger's back, ambient air is virtually stationary, exerting full 1-atmosphere pressure ($101.3\\text{ kPa}$). The resulting pressure imbalance exerts a sudden, violent net force of hundreds of Newtons sucking the passenger directly towards the moving steel wheels!",
        Hinglish: "Express train jab 130 km/h se platform cross karti hai, toh train aur passenger ke beech ki hawa bahut tezi se move karti hai, jisse wahan low pressure zone ban jaata hai. Passenger ki peeth ke peeche normal atmospheric pressure hota hai. Yeh pressure difference passenger ko train ke tracks ki taraf zabardasti push kar deta hai!",
        Tenglish: "130 km/h speed tho express train platform ni pass chesinappudu, train ki passenger ki madhyalo unna air high speed tho velladam valla low pressure create avtundi. Passenger venuka unna normal high pressure vaallani train tracks vaipu forcefully thosesthundi!"
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "The train's air blast will push the passenger backwards away from the platform edge.", isCorrect: false, feedback: "Dangerous intuition error! While you feel wind turbulence, the static pressure drop actually sucks you toward the train!" },
        { id: 'b', text: "The low-pressure zone created by high velocity air sucks the passenger toward the tracks.", isCorrect: true, feedback: "Beyond Thinking Mastered! $\\Delta P = \\frac{1}{2}\\rho v^2$ creates an inward suction force." },
        { id: 'c', text: "Static electricity on the rails magnetically attracts human clothing.", isCorrect: false, feedback: "Incorrect. The dominant force is fluid dynamic pressure differential, not electrostatic attraction." }
      ]
    },

    derivationChallenge: {
      question: "Water flows through a horizontal pipe of non-uniform cross-section. At point 1, diameter $d_1 = 10\\text{ cm}$, velocity $v_1 = 2.0\\text{ m/s}$, and pressure $P_1 = 2.0 \\times 10^5\\text{ Pa}$. At a constriction point 2, diameter $d_2 = 5\\text{ cm}$. Find the water velocity $v_2$ and pressure $P_2$. (Density of water $= 1000\\text{ kg/m}^3$)",
      steps: [
        { step: 1, title: "Continuity equation for velocity", formula: "A_1 v_1 = A_2 v_2 \\implies v_2 = v_1 \\left(\\frac{d_1}{d_2}\\right)^2 = 2.0 \\times \\left(\\frac{10}{5}\\right)^2 = 2.0 \\times 4 = 8.0\\text{ m/s}" },
        { step: 2, title: "Apply Bernoulli in horizontal pipe", formula: "P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2 \\implies P_2 = P_1 - \\frac{1}{2}\\rho(v_2^2 - v_1^2)" },
        { step: 3, title: "Calculate pressure drop", formula: "P_2 = 200,000 - \\frac{1}{2}(1000)(64 - 4) = 200,000 - 30,000 = 1.70 \\times 10^5\\text{ Pa} = 170\\text{ kPa}" }
      ],
      targetAnswer: "v2 = 8.0 m/s, P2 = 1.70 × 10^5 Pa (170 kPa)"
    },

    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Core Formula)',
        question: "For a horizontal pipe streamline flow where height $h$ is constant, what is the relation between pressure $P$ and flow speed $v$?",
        options: [
          { label: "A", text: "$P + \\rho v = \\text{constant}$", isCorrect: false },
          { label: "B", text: "$P + \\frac{1}{2}\\rho v^2 = \\text{constant}$", isCorrect: true },
          { label: "C", text: "$P \\cdot v = \\text{constant}$", isCorrect: false },
          { label: "D", text: "$P - \\frac{1}{2}\\rho v^2 = \\text{constant}$", isCorrect: false }
        ],
        explanation: "In horizontal flow ($h_1 = h_2$), Bernoulli simplifies to $P + \\frac{1}{2}\\rho v^2 = \\text{constant}$."
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Roof Blow-Off)',
        question: "During a severe hurricane, tin roofs of houses are frequently blown OFF (lifted upward and carried away) rather than collapsed downward into the house. Why?",
        options: [
          { label: "A", text: "The hurricane air pushes from underneath the foundation of the house.", isCorrect: false },
          { label: "B", text: "High velocity wind over the roof lowers external pressure, while trapped room air exerts high upward pressure.", isCorrect: true },
          { label: "C", text: "Tin sheets become negatively charged and repel the earth.", isCorrect: false },
          { label: "D", text: "Temperature drops so rapidly that roof screws shrink and snap.", isCorrect: false }
        ],
        explanation: "High wind velocity over the roof lowers external pressure ($P_{top} \\ll P_{atm}$), while still air inside retains full atmospheric pressure ($P_{inside} = P_{atm}$). The massive upward net pressure force rips the roof off!"
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Blood Artery Constriction)',
        question: "When cholesterol plaque partially narrows a major artery in the heart, what happens to the internal blood pressure inside the narrowed constriction?",
        options: [
          { label: "A", text: "Pressure increases significantly, stretching the vessel walls.", isCorrect: false },
          { label: "B", text: "Pressure decreases inside the constriction due to increased flow velocity, risking artery collapse.", isCorrect: true },
          { label: "C", text: "Velocity decreases and pressure remains unchanged.", isCorrect: false },
          { label: "D", text: "Both pressure and velocity double simultaneously.", isCorrect: false }
        ],
        explanation: "Counter-intuitive trap! By Continuity ($A_1 v_1 = A_2 v_2$), blood speed must increase inside the constriction. By Bernoulli, higher velocity means static pressure DROPS ($P_2 < P_1$). This pressure drop can cause the artery to collapse, causing a cardiac event!"
      }
    ]
  },

  {
    id: 'photoelectric-effect',
    title: "Photoelectric Effect & Quantum Dual Nature",
    shortName: "Photoelectric Effect",
    grade: "Class 12",
    subject: "Physics",
    chapter: "Dual Nature of Radiation and Matter",
    tags: ["Modern Physics", "Photons", "Work Function", "Stopping Potential"],
    formulaLatex: "K_{max} = e V_0 = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)",
    
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "Light behaves as discrete packets of energy called photons ($E = h\\nu$). When a photon collides with an electron in a metal surface, it transfers its entire energy instantaneously to eject the electron if $h\\nu \\ge \\Phi_0$.",
      
      intuitiveBreakdown: {
        Foundation: {
          English: "Imagine a vending machine that requires a 10-rupee coin to dispense a chocolate bar. If you throw a hundred 1-rupee coins at it simultaneously, it still won't give you anything! You need a coin with at least 10 rupees of value. In photoelectric effect, dim high-frequency UV light (a 20-rupee coin) immediately knocks out electrons, while a blazing bright red spotlight (a million 1-rupee coins) fails completely.",
          Hinglish: "Photoelectric effect ko ek coin machine ki tarah samjho jisme minimum 10-rupee coin chahiye. Agar aap 1-rupee ke 1000 coins phenkoge, toh bhi machine chocolate nahi degi. Lekin agar ek akela 20-rupee coin daaloge toh turant chocolate milegi. Red light kitni bhi bright ho, uski frequency threshold se kam hai toh zero electrons nikalte hain. Lekin faint UV light bhi aate hi electrons eject kar deti hai!",
          Tenglish: "Photoelectric effect ni oka ticket vending machine tho compare cheyyandi. Ticket kavali ante minimum 10 rupees coin kavalasi untundi. Meeru 1 rupee coins 100 vesina ticket raadu. Kaani okka 20 rupees coin veste instant ga ticket vastundi. Red light entha bright ga unna electrons raavu, kaani dim UV light padagane instant ga electrons eject avtayi!"
        },
        Intermediate: {
          English: "Classical wave theory failed miserably on three counts: 1) It predicted emission delay of hours for dim light (observed: instant $< 10^{-9}\\text{ s}$), 2) It predicted kinetic energy should increase with light intensity (observed: $K_{max}$ depends strictly on frequency $\\nu$), 3) It could not explain threshold frequency $\\nu_0$. Einstein resolved all three with photon conservation: $h\\nu = \\Phi_0 + K_{max}$.",
          Hinglish: "Classical wave theory teen jagah fail hui: 1) Uske hisab se dim light me ghanto baad electron nikalna chahiye tha, par real me $10^{-9}$ seconds me nikalta hai. 2) Wave theory kehti thi kinetic energy intensity par depend karegi, par real me sirf frequency par karti hai. 3) Wave theory threshold frequency explain nahi kar payi. Einstein ne photon equation $h\\nu = \\Phi_0 + K_{max}$ se solve kiya.",
          Tenglish: "Classical wave theory photoelectric effect ni explain cheyalekapoyindi. Einstein photon hypothesis tho ee problem solve chesaru: $h\\nu = \\Phi_0 + K_{max}$. Intensity penchithe number of photoelectrons peruguthayi, frequency penchithe maximum kinetic energy peruguthundi."
        },
        Advanced: {
          English: "The stopping potential characteristic equation is $V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\Phi_0}{e}$. A plot of $V_0$ vs $\\nu$ yields a universal slope $\\frac{h}{e}$, completely independent of cathode metal. Millikan spent a decade trying to disprove Einstein's equation, but his precision measurements of the slope provided the world's most accurate value of Planck's constant $h$.",
          Hinglish: "Stopping potential graph $V_0$ vs $\\nu$ ka slope hamesha $\\frac{h}{e}$ hota hai, chahe metal koi bhi ho (Lithium, Caesium, Copper). Millikan ne Einstein ko galat prove karne ke liye 10 saal experiment kiya, par aakhir me unke results ne Einstein ko 100% sahi sabit kiya aur dono ko Nobel Prize mila.",
          Tenglish: "$V_0$ vs $\\nu$ graph slope eppudu $\\frac{h}{e}$ universal constant ga untundi. Ee slope cathode material paina depend avvadu. Millikan Einstein equation ni test chesi Planck's constant $h$ value ni ultra-precise ga measure chesaru."
        }
      },

      formalBoardDefinition: "The phenomenon of emission of electrons from a metallic surface when electromagnetic radiation of suitable frequency (greater than threshold frequency) is incident upon it is called Photoelectric Effect.",
      boardEquations: [
        { label: "Einstein's Photoelectric Equation", latex: "K_{max} = h\\nu - \\Phi_0 = h\\nu - h\\nu_0 = h c \\left( \\frac{1}{\\lambda} - \\frac{1}{\\lambda_0} \\right)" },
        { label: "Stopping Potential Equation", latex: "e V_0 = K_{max} \\implies V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\Phi_0}{e}" },
        { label: "de Broglie Wavelength of Photoelectron", latex: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2 m K_{max}}} = \\frac{h}{\\sqrt{2 m e V_0}}" }
      ],
      variableKeys: [
        { symbol: "h", meaning: "Planck's constant", unit: "6.626 × 10⁻³⁴ J·s" },
        { symbol: "\\nu", meaning: "Frequency of incident photon", unit: "Hertz (Hz)" },
        { symbol: "\\Phi_0", meaning: "Work function of metal (minimum escape energy)", unit: "Joule (J) or eV" },
        { symbol: "V_0", meaning: "Cut-off / stopping potential", unit: "Volt (V)" },
        { symbol: "e", meaning: "Elementary electronic charge", unit: "1.6 × 10⁻¹⁹ C" }
      ],
      examSteps: [
        "Step 1: Convert units carefully: $1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J}$.",
        "Step 2: Check if incident photon energy $E = \\frac{hc}{\\lambda} \\ge \\Phi_0$. (Shortcut: $E(\\text{eV}) \\approx \\frac{1240}{\\lambda(\\text{nm})}$).",
        "Step 3: If $E < \\Phi_0$, write: No photoelectric emission occurs, $K_{max} = 0$.",
        "Step 4: If $E \\ge \\Phi_0$, calculate $K_{max} = E - \\Phi_0$ and stopping potential $V_0 = \\frac{K_{max}}{e}$."
      ]
    },

    layer2: {
      title: "Live Real-World Application: Solar Panels, Night Vision & Smartphone Cameras",
      applicationTitle: "Photodiode CMOS Image Sensors & Night Vision Photomultipliers",
      caseStudy: {
        English: "Every single photograph captured by your smartphone camera relies directly on the quantum photoelectric effect! The image sensor consists of millions of microscopic silicon pixels called photodiodes. When incoming photons from your scene strike a silicon pixel, each photon with energy above the silicon bandgap (1.1 eV) instantaneously dislodges an electron into the conduction band. The accumulated electronic charge on each pixel is read out as an exact digital pixel brightness. In military night-vision goggles, a photocathode absorbs faint invisible infrared photons, ejects photoelectrons, accelerates them across high voltage into a microchannel plate, multiplying them a million times to display a glowing green image of pitch-dark terrain.",
        Hinglish: "Aapke smartphone camera ki har photo photoelectric effect ki badolat banti hai! Camera sensor me millions of silicon photodiodes hote hain. Jab light photon sensor se takrata hai, woh electron ko free kar deta hai. Har pixel par collect hone wale electrons ka charge computer digital photo me convert kar deta hai. Night vision goggles me bhi photocathode faint photons ko electrons me convert karke amplify karta hai.",
        Tenglish: "Smartphone camera tho teesey prathi photo photoelectric effect valla click avtundi! Camera sensor lo unde millions of pixels photon padina ventane electron ni release chestayi. Ee electric charge ni digital image ga convert chestaru. Night vision goggles lo kuda photocathode faint light photons ni photoelectrons ga convert chesi amplify chestundi."
      },
      engineeringDiagramConcept: "Photon Absorption -> Electron-Hole Pair Generation -> CMOS Charge Well Readout",
      realWorldExamples: [
        "CMOS Image Sensors in DSLR and smartphone cameras",
        "Solar Photovoltaic (PV) cells generating clean electricity",
        "Military Night-Vision Goggles & Photomultiplier Tubes (PMT)",
        "Burglar alarm photo-relay beams & automatic elevator doors"
      ]
    },

    layer3: {
      title: "Origin Story: Einstein's Miracle Year (1905) & The Photon Revolution",
      hero: "Albert Einstein (and Heinrich Hertz / Philipp Lenard)",
      era: "1905, Bern Patent Office, Switzerland",
      narrative: {
        English: "In 1887, Heinrich Hertz discovered radio waves, confirming Maxwell's wave theory of light. But ironically, Hertz noticed an annoying side-effect: his spark gaps sparked more easily when illuminated with ultraviolet light. His student Philipp Lenard investigated this in 1902 and discovered that increasing light intensity didn't increase electron speed at all! The greatest physicists of Europe were completely baffled because wave theory insisted bright waves carry bigger energy. In 1905, a 26-year-old patent clerk named Albert Einstein solved the mystery by audaciously reviving Newton's particle idea: light isn't a continuous wave, but localized packets of energy called 'quanta'. It was for this revolutionary paper on the Photoelectric Effect — NOT for the Theory of Relativity — that Einstein was awarded the 1921 Nobel Prize in Physics!",
        Hinglish: "1887 me Heinrich Hertz ne radio waves discover ki, par ek ajeeb cheez dekhi ki UV light padne par spark aasani se nikalta hai. 1902 me Philipp Lenard ne dekha ki bright light se electron ki speed nahi badhti. Poori duniya ke scientists hairan the. 1905 me 26 saal ke Albert Einstein ne Bern ke patent office me baithe-baithe declare kiya ki light continuous wave nahi, balki energy packets (photons) ka stream hai. Einstein ko unki Theory of Relativity ke liye nahi, balki Photoelectric Effect ke liye 1921 ka Nobel Prize mila tha!",
        Tenglish: "1887 lo Hertz radio waves discover chesaru, kaani UV light padinappudu spark ravadam kanipinchindi. Lenard chusaru ki bright light valla electron speed peragadam ledu. 1905 lo 26 years unna Albert Einstein patent office lo work chesthu, light anedi continuous wave kaadu, packets of energy (photons) ani propose chesaru. Einstein ki Nobel Prize vachindi Relativity kosam kaadu, Photoelectric Effect kosame!"
      },
      epiphanyKey: "Energy Quantization: Light energy is delivered in all-or-nothing localized bullet packets (photons); an electron absorbs either the entire photon or nothing at all."
    },

    layer4: {
      title: "Beyond the Horizon: The Intense Laser Threshold Paradox",
      paradoxQuestion: "Work function of platinum is $\\Phi_0 = 5.65\\text{ eV}$. Red laser light has photon energy $1.8\\text{ eV}$. If you shine an ultra-intense military laser of 100,000 Watts of red light on platinum, will electrons be emitted?",
      hint: "Distinguish between standard single-photon absorption and multi-photon quantum non-linear ionization.",
      explanation: {
        English: "Under standard linear photoelectric conditions taught in intermediate board exams, NO electrons are emitted because single photon energy ($1.8\\text{ eV} < 5.65\\text{ eV}$). However, in modern ultra-fast femtosecond lasers where photon flux exceeds $10^{18}\\text{ W/cm}^2$, an electron can absorb three or four photons SIMULTANEOUSLY within a femtosecond window ($4 \\times 1.8\\text{ eV} = 7.2\\text{ eV} > 5.65\\text{ eV}$) in a non-linear quantum process called 'Multi-Photon Photoelectric Emission'!",
        Hinglish: "Standard board physics ke according ek bhi electron nahi nikalna chahiye kyunki $1.8\\text{ eV} < 5.65\\text{ eV}$. Lekin ultra-high power laser me photon density itni zyada hoti hai ki ek hi electron ek saath 3-4 photons absorb kar leta hai ($4 \\times 1.8 = 7.2\\text{ eV}$). Isse 'Multi-Photon Photoelectric Emission' kehte hain!",
        Tenglish: "Normal board syllabus prakaram electrons emit avvavu ($1.8 < 5.65\\text{ eV}$). Kaani ultra-dense femtosecond lasers lo 'Multi-photon absorption' valla okka electron okesari multiple photons ni absorb chesukuni ($4 \\times 1.8 = 7.2\\text{ eV}$) emit avvagalthundi!"
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "Yes, millions of electrons emit immediately because 100,000 Watts carries enormous energy.", isCorrect: false, feedback: "Classical trap! Standard photoelectric effect is frequency-dependent, not wattage-dependent." },
        { id: 'b', text: "No in linear regime ($h\\nu < \\Phi_0$), but Yes if photon density enables multi-photon absorption.", isCorrect: true, feedback: "Beyond Thinking Mastered! You distinguished between linear single-photon physics and non-linear quantum optics!" },
        { id: 'c', text: "The metal turns transparent and absorbs zero photons.", isCorrect: false, feedback: "Incorrect. Platinum remains an opaque conductor." }
      ]
    },

    derivationChallenge: {
      question: "Light of wavelength $\\lambda_1 = 300\\text{ nm}$ falls on a metal surface, requiring a stopping potential of $1.85\\text{ V}$. When light of wavelength $\\lambda_2 = 400\\text{ nm}$ is used, the stopping potential drops to $0.82\\text{ V}$. Calculate Planck's constant $h$ and the work function $\\Phi_0$ of the metal.",
      steps: [
        { step: 1, title: "Write Einstein equation for both cases", formula: "e V_1 = \\frac{h c}{\\lambda_1} - \\Phi_0 \\quad \\text{and} \\quad e V_2 = \\frac{h c}{\\lambda_2} - \\Phi_0" },
        { step: 2, title: "Subtract equations to eliminate work function", formula: "e(V_1 - V_2) = h c \\left( \\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2} \\right) \\implies h = \\frac{e(V_1 - V_2)}{c \\left(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2}\\right)}" },
        { step: 3, title: "Substitute values and solve", formula: "h = \\frac{1.6 \\times 10^{-19} \\times (1.85 - 0.82)}{3 \\times 10^8 \\times \\left(\\frac{1}{300 \\times 10^{-9}} - \\frac{1}{400 \\times 10^{-9}}\\right)} \\approx 6.59 \\times 10^{-34}\\text{ J}\\cdot\\text{s}; \\quad \\Phi_0 = 2.28\\text{ eV}" }
      ],
      targetAnswer: "h ≈ 6.6 × 10^-34 J·s, Φ0 = 2.28 eV"
    },

    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Einstein Formula)',
        question: "If the frequency of incident radiation is doubled while keeping intensity constant, what happens to the maximum kinetic energy $K_{max}$ of emitted photoelectrons?",
        options: [
          { label: "A", text: "It doubles exactly.", isCorrect: false },
          { label: "B", text: "It becomes more than double.", isCorrect: true },
          { label: "C", text: "It remains unchanged.", isCorrect: false },
          { label: "D", text: "It quadruples.", isCorrect: false }
        ],
        explanation: "Algebraic exam trap! $K_{max, 1} = h\\nu - \\Phi_0$. When frequency doubles: $K_{max, 2} = 2h\\nu - \\Phi_0 = 2(h\\nu - \\Phi_0) + \\Phi_0 = 2 K_{max, 1} + \\Phi_0$. Because $\\Phi_0 > 0$, the new kinetic energy is MORE than double!"
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Intensity vs Stopping Potential)',
        question: "A phototube is illuminated by a point source of monochromatic light at a distance of $1\\text{ m}$. If the distance is increased to $2\\text{ m}$, what happens to the stopping potential $V_0$?",
        options: [
          { label: "A", text: "Stopping potential is halved.", isCorrect: false },
          { label: "B", text: "Stopping potential becomes one-fourth.", isCorrect: false },
          { label: "C", text: "Stopping potential remains strictly UNCHANGED.", isCorrect: true },
          { label: "D", text: "Stopping potential becomes negative.", isCorrect: false }
        ],
        explanation: "By inverse square law, increasing distance reduces INTENSITY (number of photons per second) to 1/4th. But the FREQUENCY $\\nu$ of each photon remains completely identical! Since $e V_0 = h\\nu - \\Phi_0$, stopping potential depends solely on frequency, so $V_0$ is completely unaffected!"
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Time Lag in Wave Theory)',
        question: "According to classical wave theory, why should there be a noticeable time delay (hours or days) before an electron escapes from a metal illuminated by faint light?",
        options: [
          { label: "A", text: "Electrons need time to migrate from the back of the metal plate.", isCorrect: false },
          { label: "B", text: "Wavefront energy spreads over millions of surface atoms, requiring hours for one atom to collect $\\Phi_0$.", isCorrect: true },
          { label: "C", text: "Metal atoms continuously absorb and reflect light without heating.", isCorrect: false },
          { label: "D", text: "Photons move too slowly inside metal lattice.", isCorrect: false }
        ],
        explanation: "A classical continuous wave spreads its energy continuously over the entire surface area. Each atom covers $\\approx 10^{-19}\\text{ m}^2$, receiving an infinitesimally tiny fraction of power, requiring hours to accumulate the required $\\approx 2\\text{ eV}$. In reality, quantum photon absorption is instantaneous ($< 10^{-9}\\text{ s}$)."
      }
    ]
  },

  // 5. Chemistry Topic: Le Chatelier's Principle
  {
    id: 'le-chatelier',
    title: "Chemical Equilibrium & Le Chatelier's Principle",
    shortName: "Le Chatelier's Principle",
    grade: "Class 11",
    subject: "Chemistry",
    chapter: "Equilibrium",
    tags: ["Physical Chemistry", "Equilibrium Constant", "Reaction Quotient", "Industrial Synthesis"],
    formulaLatex: "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b} \\quad ; \\quad \\Delta G = \\Delta G^\\circ + RT\\ln Q",
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "If a dynamic equilibrium system is subjected to a disturbance in concentration, pressure, or temperature, the system shifts in the direction that counteracts the change.",
      intuitiveBreakdown: {
        Foundation: {
          English: "Imagine a two-person seesaw perfectly balanced in mid-air. If someone drops a heavy backpack onto the left seat, the left side dips. To restore balance, the left person must slide inward or pass weight to the right side! That is Le Chatelier's Principle: whenever you disturb a chemical seesaw, the reaction shifts automatically to fight your disturbance.",
          Hinglish: "Chemical equilibrium ko ek perfectly balanced seesaw samjho. Agar aap left side me achanak zyada reactant daal doge, toh system right side me product banakar uss extra weight ko balance karega. Agar aap heat badhaoge, toh reaction uss taraf bhaagegi jo heat ko absorb kare (endothermic).",
          Tenglish: "Chemical equilibrium ni oka balanced seesaw tho compare cheyyandi. Left side reactants ekkuva veste, system ventane right side products ni generate chesi balance chestundi. Heat penchithe endothermic direction lo shift ayyi heat ni thaggisthundi. Ee self-balancing nature ne Le Chatelier's principle antaru."
        },
        Intermediate: {
          English: "Equilibrium shifts according to reaction quotient $Q$ relative to $K_c$. Adding reactants makes $Q < K_c$, shifting the reaction forward. For gas reactions, increasing pressure shifts equilibrium towards fewer gaseous moles ($\\Delta n_g < 0$). In the Haber ammonia process ($N_2 + 3H_2 \\rightleftharpoons 2NH_3, \\Delta H = -92.4\\text{ kJ/mol}$), high pressure (200 atm) favors ammonia yield.",
          Hinglish: "Equilibrium shift reaction quotient $Q$ aur $K_c$ ke comparison par depend karta hai. Reactants add karne par $Q < K_c$ hota hai, isliye forward shift hoti hai. Pressure badhane par equilibrium uss taraf shift hota hai jahan gaseous moles kam hon. Haber process me 4 moles se 2 moles bante hain, isliye high pressure se ammonia yield badhti hai.",
          Tenglish: "$Q$ and $K_c$ relation batti equilibrium shift avtundi. Reactants add cheste $Q < K_c$ ayyi forward shift avtundi. Pressure penchithe thakkuva gaseous moles unna side ki shift avtundi ($N_2 + 3H_2 \\rightleftharpoons 2NH_3$). Anduke Haber process lo 200 atm high pressure use chestaru."
        },
        Advanced: {
          English: "Thermodynamically, temperature dependence is governed strictly by the van 't Hoff isobar: $\\frac{d\\ln K}{dT} = \\frac{\\Delta H^\\circ}{RT^2}$. For exothermic reactions ($\\Delta H^\\circ < 0$), $K$ decreases monotonically with $T$. Pressure and inert gas additions at constant volume have zero effect on $K_p$ since partial pressures remain constant.",
          Hinglish: "Van 't Hoff equation $\\frac{d\\ln K}{dT} = \\frac{\\Delta H^\\circ}{RT^2}$ show karti hai ki exothermic reaction ke liye temperature badhane par $K$ value kam ho jaati hai. Constant volume par inert gas daalne se partial pressures change nahi hote, isliye equilibrium par koi farak nahi padta.",
          Tenglish: "Van 't Hoff relation $\\frac{d\\ln K}{dT} = \\frac{\\Delta H^\\circ}{RT^2}$ prakaram exothermic reactions ki temperature perigithe $K_p$ thaggipotundi. Constant volume daggara inert gas add cheste partial pressure maaradu kabatti shift undadu."
        }
      },
      formalBoardDefinition: "Le Chatelier's Principle states that if a system at dynamic equilibrium is subjected to a change of concentration, temperature, or pressure, the equilibrium will shift in a direction that tends to counteract or nullify the effect of the imposed change.",
      boardEquations: [
        { label: "Equilibrium Constant Expression", latex: "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}" },
        { label: "van 't Hoff Equation", latex: "\\ln\\left(\\frac{K_2}{K_1}\\right) = \\frac{\\Delta H^\\circ}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)" },
        { label: "Gibbs Free Energy & Equilibrium", latex: "\\Delta G^\\circ = -RT \\ln K" }
      ],
      variableKeys: [
        { symbol: "K_c", meaning: "Equilibrium constant in molar concentrations", unit: "dimensionless / (mol/L)^Δn" },
        { symbol: "\\Delta H^\\circ", meaning: "Standard enthalpy change of reaction", unit: "kJ/mol" },
        { symbol: "Q", meaning: "Reaction quotient at non-equilibrium instant", unit: "dimensionless" },
        { symbol: "R", meaning: "Universal gas constant", unit: "8.314 J/(mol·K)" }
      ],
      examSteps: [
        "Step 1: Write balanced stoichiometric equation and compute $\\Delta n_g = n_{products, gas} - n_{reactants, gas}$.",
        "Step 2: Check sign of $\\Delta H$. If $\\Delta H < 0$ (exothermic), cooling favors products; heating favors reactants.",
        "Step 3: Analyze pressure effect: Increasing pressure shifts towards side with smaller $\\Delta n_g$.",
        "Step 4: Note: Adding a catalyst speeds up rate but NEVER shifts the equilibrium composition or alters $K_c$!"
      ]
    },
    layer2: {
      title: "Live Real-World Application: The Haber-Bosch Ammonia Fertilizer Revolution",
      applicationTitle: "Haber-Bosch Nitrogen Fixation Feeding 4 Billion Humans",
      caseStudy: {
        English: "Nearly 50% of the nitrogen atoms in your body originated from a Haber-Bosch industrial chemical reactor! Ammonia synthesis: $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) + 92.4\\text{ kJ}$. Because the forward reaction is exothermic, low temperature favors maximum equilibrium yield ($K_p$). But at low temperatures, kinetic collision rate is painfully slow! Chemical engineers deploy Le Chatelier's insight: operate at an optimal compromise temperature of $450^\\circ\\text{C}$ with a porous iron catalyst, and crank the pressure up to a staggering $200\\text{ atmospheres}$. The high pressure forces the 4 gas molecules into 2 product molecules, achieving high yield at high speeds.",
        Hinglish: "Hamare body me 50% nitrogen atoms Haber-Bosch factory reactor se aate hain! Reaction: $N_2 + 3H_2 \\rightleftharpoons 2NH_3$. Kyunki reaction exothermic hai, low temperature zyada ammonia banayega, par low temp par reaction itni slow hoti hai ki saalo lag jayenge. Engineers ne Le Chatelier use kiya: $450^\\circ\\text{C}$ par iron catalyst lagaya aur pressure 200 atm tak badha diya taaki 4 gas molecules 2 molecules me compress ho sakein.",
        Tenglish: "Manam tinalani food lo unde nitrogen lo 50% Haber-Bosch process valla vachindi! $N_2 + 3H_2 \\rightleftharpoons 2NH_3$. Reaction exothermic avvadam valla low temp lo ammonia ekkuva vastundi, kaani speed thakkuva. Engineers Le Chatelier principle use chesi 200 atm high pressure and $450^\\circ\\text{C}$ iron catalyst tho industrial scale lo ammonia produce chesaru."
      },
      engineeringDiagramConcept: "Compression to 200 atm -> Condensing Liquid NH3 -> Recycling Unreacted N2/H2",
      realWorldExamples: [
        "Industrial Ammonia synthesis for worldwide agricultural fertilizers",
        "Contact Process for concentrated Sulfuric Acid ($2SO_2 + O_2 \\rightleftharpoons 2SO_3$)",
        "Human Blood Hemoglobin oxygen binding at high altitude lungs vs deep muscles",
        "Carbonated soda bottles fizzing when bottle cap pressure is released"
      ]
    },
    layer3: {
      title: "Origin Story: Henri Le Chatelier & The Mining Gas Explosions (1884)",
      hero: "Henri Louis Le Chatelier",
      era: "1884, École des Mines de Paris, France",
      narrative: {
        English: "In the 1880s, fatal methane explosions were incinerating hundreds of French coal miners underground. Mining engineer Henri Le Chatelier was tasked with investigating how flame fronts propagate through flammable gas mixtures. While experimenting with gas pressures and temperature gradients, he noticed a universal stabilizing reflex in nature: systems under chemical or mechanical stress naturally deform in the direction that relieves the applied stress. In 1884, he announced his universal law of chemical homeostasis. Ironically, when Fritz Haber implemented Le Chatelier's principles 25 years later to synthesize ammonia, Le Chatelier admitted he had narrowly missed inventing the industrial Haber process himself due to a flawed laboratory apparatus explosion!",
        Hinglish: "1880s me France ki koyla khadaano me methane gas explosions se hazaro miners mar rahe the. Mining engineer Henri Le Chatelier ko iska solution nikalne bheja gaya. Gas mixtures par experiment karte waqt unhone notice kiya ki nature hamesha external stress ko oppose karke khud ko stabilize karti hai. 1884 me unhone apna famous principle publish kiya.",
        Tenglish: "1880s lo French coal mines lo methane explosions jarigi chala mandi chanipoyevaru. Henri Le Chatelier ee problem ni solve cheyadaniki experiments chestunnappudu, nature eppudu external pressure ni counter chesi equilibrium ni kapaduthundani kanugonnaru. 1884 lo ee universal principle ni announce chesaru."
      },
      epiphanyKey: "Dynamic Homeostasis: Chemical equilibrium is not a dead standstill; forward and reverse molecular reactions match speeds, shifting dynamically against any external disturbance."
    },
    layer4: {
      title: "Beyond the Horizon: The Constant-Volume Inert Gas Trap",
      paradoxQuestion: "At dynamic equilibrium in a rigid steel container: $PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$. If you pump in inert Argon gas at CONSTANT VOLUME, the total gauge pressure doubles! Does the equilibrium shift forward, backward, or remain unchanged?",
      hint: "Check whether the partial pressures or molar concentrations of PCl5, PCl3, or Cl2 change when Argon is added into a rigid box.",
      explanation: {
        English: "Classic Exam Trap! Because volume $V$ is constant, the partial pressures $p_i = \\frac{n_i R T}{V}$ and molar concentrations of $PCl_5$, $PCl_3$, and $Cl_2$ remain STRICTLY UNCHANGED! Although total pressure increased due to Argon collisions, Argon takes no part in the reaction. Since partial pressures are unaltered, the reaction quotient $Q_p = K_p$, and the equilibrium strictly DOES NOT SHIFT at all!",
        Hinglish: "Ye standard entrance exam trap hai! Kyunki volume constant hai, $PCl_5, PCl_3, Cl_2$ ke partial pressures me zero change hota hai. Argon reaction me hissa nahi leta. Isliye equilibrium bilkul shift nahi hota — unchanged rehta hai!",
        Tenglish: "Idi classic exam trap! Volume constant ga undadam valla reactants and products yokka partial pressures maaravu. Argon inert gas kabatti reaction lo participate cheyadu. Kabatti equilibrium shift avvadu, strictly unchanged untundi!"
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "Shifts backward to PCl5 because total pressure doubled.", isCorrect: false, feedback: "Trap! Le Chatelier responds to partial pressures of reactants/products, not inert gas pressure at constant volume." },
        { id: 'b', text: "Remains strictly UNCHANGED because partial pressures of reacting gases are unaffected.", isCorrect: true, feedback: "Beyond Thinking Mastered! At constant volume, inert gas does not change reactant concentrations or partial pressures!" },
        { id: 'c', text: "All PCl5 decomposes into elemental phosphorus.", isCorrect: false, feedback: "Incorrect. The equilibrium constant K is only changed by temperature." }
      ]
    },
    derivationChallenge: {
      question: "For the dissociation $N_2O_4(g) \\rightleftharpoons 2NO_2(g)$, the degree of dissociation is $\\alpha = 0.20$ at total pressure $P = 1.0\\text{ atm}$. Calculate $K_p$. If pressure is compressed to $P = 4.0\\text{ atm}$, calculate the new $\\alpha$.",
      steps: [
        { step: 1, title: "Express partial pressures in terms of α", formula: "p_{N2O4} = \\frac{1-\\alpha}{1+\\alpha}P \\quad ; \\quad p_{NO2} = \\frac{2\\alpha}{1+\\alpha}P \\implies K_p = \\frac{4\\alpha^2 P}{1-\\alpha^2}" },
        { step: 2, title: "Calculate Kp at P = 1.0 atm", formula: "K_p = \\frac{4(0.20)^2(1.0)}{1 - (0.20)^2} = \\frac{0.16}{0.96} = 0.167\\text{ atm}" },
        { step: 3, title: "Solve new α at P = 4.0 atm", formula: "0.167 = \\frac{4\\alpha^2(4.0)}{1-\\alpha^2} = \\frac{16\\alpha^2}{1-\\alpha^2} \\implies \\alpha = \\sqrt{\\frac{0.167}{16.167}} \\approx 0.102" }
      ],
      targetAnswer: "Kp = 0.167 atm, new α = 0.102 (dissociation decreases from 20% to 10.2%)"
    },
    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Le Chatelier Definition)',
        question: "For an endothermic reaction ($\\Delta H > 0$), what will happen to the equilibrium constant $K$ if temperature is increased?",
        options: [
          { label: "A", text: "$K$ decreases", isCorrect: false },
          { label: "B", text: "$K$ increases", isCorrect: true },
          { label: "C", text: "$K$ remains constant", isCorrect: false },
          { label: "D", text: "$K$ drops to zero", isCorrect: false }
        ],
        explanation: "By van 't Hoff equation $\\ln(K_2/K_1) = \\frac{\\Delta H}{R}(1/T_1 - 1/T_2)$, for $\\Delta H > 0$, raising temperature increases $K$."
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Catalyst Trap)',
        question: "A chemical engineer adds a platinum catalyst to an ongoing equilibrium reaction $A + B \\rightleftharpoons C$. What happens to the final percentage yield of product $C$ at equilibrium?",
        options: [
          { label: "A", text: "Yield increases by at least 25%", isCorrect: false },
          { label: "B", text: "Yield decreases due to reverse rate acceleration", isCorrect: false },
          { label: "C", text: "Yield remains strictly UNCHANGED (catalyst only speeds up time to reach equilibrium)", isCorrect: true },
          { label: "D", text: "Reaction stops immediately", isCorrect: false }
        ],
        explanation: "Universal Exam Trap! A catalyst lowers activation energy equally for both forward and reverse reactions ($k_f$ and $k_b$ increase by identical ratios). Therefore, $K_c = k_f/k_b$ is completely unchanged, and final yield is identical!"
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Inert Gas at Constant Pressure)',
        question: "In the reaction $PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)$, what happens if Helium is added at CONSTANT TOTAL PRESSURE?",
        options: [
          { label: "A", text: "Equilibrium shifts forward (dissociation increases) to expand volume.", isCorrect: true },
          { label: "B", text: "Equilibrium shifts backward to minimize moles.", isCorrect: false },
          { label: "C", text: "Equilibrium remains unchanged.", isCorrect: false },
          { label: "D", text: "Helium reacts with Chlorine.", isCorrect: false }
        ],
        explanation: "At CONSTANT PRESSURE, adding Helium forces total volume to expand ($V$ increases). This dilutes reactant/product partial pressures. The system shifts towards the side with more moles ($\\Delta n_g > 0$, forward) to restore partial pressures!"
      }
    ]
  },

  // 6. Mathematics Topic: Definite Integrals & Fundamental Theorem of Calculus
  {
    id: 'calculus-ftc',
    title: "Definite Integrals & Fundamental Theorem of Calculus",
    shortName: "Fundamental Theorem of Calculus",
    grade: "Class 12",
    subject: "Mathematics",
    chapter: "Integrals",
    tags: ["Calculus", "Riemann Sums", "Area under Curve", "Derivatives"],
    formulaLatex: "\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad \\text{where } F'(x) = f(x)",
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "Integration and differentiation are inverse operations. The accumulated area under a rate function $f(x)$ from $a$ to $b$ equals the net difference in its antiderivative $F(b) - F(a)$.",
      intuitiveBreakdown: {
        Foundation: {
          English: "Imagine driving a car where the odometer is broken, but you have a continuous video recording of your speedometer needle. How do you find total distance? By adding up all the tiny distance slices: (speed × tiny time interval $dt$). Integration is just an infinite sum of paper-thin rectangular strips! The Fundamental Theorem reveals that you don't have to add millions of rectangles by hand; you just find the antiderivative function.",
          Hinglish: "Socho aapki car ka odometer kharab hai par speedometer chal raha hai. Aap distance kaise nikaloge? Har second ki speed ko time se multiply karke add karke! Definite integral असल me infinitely thin strips ka sum hai. Fundamental Theorem of Calculus kehta hai ki strips jodane ki zaroorat nahi hai, bas antiderivative nikaalo aur $F(b) - F(a)$ subtract kar do.",
          Tenglish: "Car lo speedometer unna odometer pani cheyakapothe total distance ela calculate chestaru? Prathi second speed ni time tho multiply chesi add chestharu. Integral anedi chala sanna strips yokka sum. Fundamental Theorem of Calculus dwara manam rectangles anni add cheyakundane direct ga antiderivative $F(b) - F(a)$ chesi area kanukovachu."
        },
        Intermediate: {
          English: "Part 1 of FTC establishes that $\\frac{d}{dx}\\left[\\int_a^x f(t)\\,dt\\right] = f(x)$. Part 2 states that $\\int_a^b f(x)\\,dx = F(b) - F(a)$. For competitive exams (JEE/CBSE), the Leibniz Rule for differentiating under the integral sign is essential: $\\frac{d}{dx}\\int_{u(x)}^{v(x)} f(t)\\,dt = f(v(x))v'(x) - f(u(x))u'(x)$.",
          Hinglish: "FTC Part 1 show karta hai ki integral ka derivative wapas original function deta hai. Part 2 area calculate karta hai $F(b) - F(a)$. JEE entrance me Leibniz Integral Rule sabse important hai: $\\frac{d}{dx}\\int_{u(x)}^{v(x)} f(t)\\,dt = f(v(x))v'(x) - f(u(x))u'(x)$.",
          Tenglish: "FTC Part 1 lo derivative of integral original function vastundi. Part 2 area ni $F(b) - F(a)$ ga define chestundi. Competitive exams lo Leibniz differentiation under integral sign formula chala frequently adugutaru."
        },
        Advanced: {
          English: "In differential geometry, the Fundamental Theorem of Calculus is the 1-dimensional case of the Generalized Stokes' Theorem on smooth oriented manifolds: $\\int_{\\partial \\Omega} \\omega = \\int_\\Omega d\\omega$. Here the boundary $\\partial [a,b] = \\{b\\} - \\{a\\}$, and the exterior derivative $d(F) = f(x)\\,dx$.",
          Hinglish: "Higher mathematics me Fundamental Theorem of Calculus असल me Generalized Stokes' Theorem $\\int_{\\partial \\Omega} \\omega = \\int_\\Omega d\\omega$ ka 1D version hai. Boundary integral $F(b) - F(a)$ volume integral of differential form ke barabar hota hai.",
          Tenglish: "Advanced differential geometry lo FTC anedi Generalized Stokes' Theorem yokka 1D representation: $\\int_{\\partial \\Omega} \\omega = \\int_\\Omega d\\omega$."
        }
      },
      formalBoardDefinition: "The Fundamental Theorem of Calculus states that if $f(x)$ is continuous on $[a,b]$ and $F(x)$ is any antiderivative of $f(x)$ such that $F'(x) = f(x)$, then $\\int_a^b f(x)\\,dx = [F(x)]_a^b = F(b) - F(a)$.",
      boardEquations: [
        { label: "Fundamental Theorem of Calculus", latex: "\\int_a^b f(x)\\,dx = F(b) - F(a)" },
        { label: "Leibniz Differentiation Rule", latex: "\\frac{d}{dx}\\left[\\int_{u(x)}^{v(x)} f(t)\\,dt\\right] = f(v(x))\\cdot v'(x) - f(u(x))\\cdot u'(x)" },
        { label: "Definite Integral as Riemann Sum", latex: "\\lim_{n \\to \\infty} \\sum_{r=1}^n \\frac{1}{n} f\\left(\\frac{r}{n}\\right) = \\int_0^1 f(x)\\,dx" }
      ],
      variableKeys: [
        { symbol: "f(x)", meaning: "Integrand rate function", unit: "output units / input unit" },
        { symbol: "F(x)", meaning: "Antiderivative primitive function", unit: "accumulated units" },
        { symbol: "[a,b]", meaning: "Interval of definite integration", unit: "limits" }
      ],
      examSteps: [
        "Step 1: Check continuity of $f(x)$ on $[a,b]$. Look out for vertical asymptotes or non-differentiable points (like $|x-1|$).",
        "Step 2: Find indefinite antiderivative $F(x) = \\int f(x)\\,dx$. Omit constant of integration $+C$.",
        "Step 3: Evaluate upper limit $F(b)$ and lower limit $F(a)$.",
        "Step 4: Subtract: $[F(x)]_a^b = F(b) - F(a)$."
      ]
    },
    layer2: {
      title: "Live Real-World Application: Autonomous Vehicle Trajectory & Satellite Orbit Insertion",
      applicationTitle: "Inertial Navigation Systems & Trajectory Dead Reckoning",
      caseStudy: {
        English: "How does a SpaceX Falcon 9 rocket accurately insert a satellite into geostationary orbit without GPS in deep space? It continuously measures acceleration $\\mathbf{a}(t)$ using tri-axial laser ring gyroscopes. By the Fundamental Theorem of Calculus, its on-board flight computer integrates acceleration once to compute instantaneous velocity: $\\mathbf{v}(t) = \\mathbf{v}_0 + \\int_0^t \\mathbf{a}(\\tau)\\,d\\tau$. It integrates velocity a second time to determine exact 3D spatial position: $\\mathbf{r}(t) = \\mathbf{r}_0 + \\int_0^t \\mathbf{v}(\\tau)\\,d\\tau$. This double-definite-integral algorithm is called 'Inertial Dead Reckoning'.",
        Hinglish: "SpaceX Falcon 9 rocket bina GPS ke space me exact orbit me kaise pahunchta hai? Rocket ke sensors acceleration measure karte hain. FTC use karke flight computer acceleration ko integrate karke velocity $\\mathbf{v}(t) = \\int \\mathbf{a}\\,dt$ nikalta hai, aur dobara integrate karke exact position $\\mathbf{r}(t) = \\int \\mathbf{v}\\,dt$ nikal leta hai.",
        Tenglish: "SpaceX rockets deep space lo GPS lekundane exact location ni ela calculate chestayi? Accelerometers dwara acceleration ni measure chesi, FTC integrals apply chesi velocity and position ni real-time lo calculate chestayi."
      },
      engineeringDiagramConcept: "Accelerometer -> Integral 1 (Velocity) -> Integral 2 (Exact Trajectory Position)",
      realWorldExamples: [
        "Inertial Navigation Systems (INS) in submarines, fighter jets, and spacecraft",
        "Civil Engineering: Calculating bending moments and shear stresses in suspension bridges",
        "Financial Quantitative Models: Option pricing via Black-Scholes continuous integrals",
        "Medical CT Scanners: Radon transform numerical integration reconstructing 3D organs"
      ]
    },
    layer3: {
      title: "Origin Story: Newton, Leibniz, & The Infinitesimal War (1666-1684)",
      hero: "Sir Isaac Newton & Gottfried Wilhelm Leibniz",
      era: "1666 (Woolsthorpe) & 1675 (Paris)",
      narrative: {
        English: "Before the 17th century, geometry was static. Finding tangents (derivatives) was viewed as completely unrelated to finding enclosed areas (integrals). In 1666, isolated at Woolsthorpe Manor during the Great Plague of London, 23-year-old Isaac Newton recognized that fluxions (velocities) and fluents (areas) were exact inverses. Independently in 1675, German polymath Gottfried Leibniz invented the elegant notation we still write today: the elongated 'S' for sum ($\int$) and $dx$ for infinitesimal difference. A bitter, ugly priority war erupted between England and the European continent over who copied whom, but together they gifted humanity the mathematical engine of modern science.",
        Hinglish: "17th century se pehle differentiation aur integration ko do bilkul alag problems maana jaata tha. 1666 me Great Plague ke dauraan 23 saal ke Isaac Newton ne discover kiya ki dono ek doosre ke exact reverse hain. 1675 me Leibniz ne $\\int$ symbol banaya jo aaj tak hum use karte hain.",
        Tenglish: "17th century mundu differentiation and integration renduki sambandham ledani anukunevaru. Newton and Leibniz iddari independent discovery dwara ee rendoo inverse operations ani prove ayyindi."
      },
      epiphanyKey: "Inverse Invariance: The rate at which the area under a curve grows at point $x$ is equal to the height of the curve $f(x)$ at that very point!"
    },
    layer4: {
      title: "Beyond the Horizon: The Gabriel's Horn Paradox",
      paradoxQuestion: "Consider the surface of revolution formed by rotating $y = 1/x$ for $x \\ge 1$ around the x-axis ('Gabriel's Horn'). Its volume is finite: $V = \\pi \\int_1^\\infty \\frac{1}{x^2}\\,dx = \\pi\\text{ cubic units}$. But its surface area is infinite: $A = 2\\pi \\int_1^\\infty \\frac{1}{x}\\sqrt{1 + 1/x^4}\\,dx = \\infty$! Could you fill the horn with a bucket of paint, but never have enough paint to paint its surface?",
      hint: "Distinguish between mathematical 3D volume and physical 2D surface thickness.",
      explanation: {
        English: "The mathematical paradox is 100% genuine! The horn holds a finite volume of paint ($\pi$ units), which naturally touches and coats every point of the interior surface. But you could never paint the exterior with a finite bucket of standard paint because physical paint molecules have non-zero atomic diameter ($10^{-10}\\text{ m}$), whereas Gabriel's horn tapers down into infinitesimally thin mathematical dimensions!",
        Hinglish: "Ye paradox 100% mathematically true hai! Isme $\\pi$ litres paint bhar kar andar ka poora surface coat ho jaata hai, par bahar paint karne ke liye infinite paint chahiye! Physical world me paint ke molecules ka finite size hota hai jo horn ke patle end me fit nahi ho sakta.",
        Tenglish: "Gabriel's Horn volume finite ga ($\pi$) untundi, kaani surface area infinite ga untundi! Math lo idi absolute true paradox."
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "Calculus is flawed; finite volume cannot have infinite area.", isCorrect: false, feedback: "Incorrect. The integrals rigorously converge for volume and diverge for surface area." },
        { id: 'b', text: "True paradox in abstract math; in reality, atomic thickness limits the infinite horn.", isCorrect: true, feedback: "Beyond Thinking Mastered! You distinguished between infinite continuum math and discrete atomic physics!" },
        { id: 'c', text: "The horn collapses under atmospheric pressure.", isCorrect: false, feedback: "Irrelevant physical boundary condition." }
      ]
    },
    derivationChallenge: {
      question: "Evaluate $\\lim_{n \\to \\infty} \\left[ \\frac{1}{n+1} + \\frac{1}{n+2} + \\dots + \\frac{1}{2n} \\right]$ using definite integration as a Riemann sum.",
      steps: [
        { step: 1, title: "Rewrite series into sigma form with 1/n factor", formula: "S = \\lim_{n \\to \\infty} \\sum_{r=1}^n \\frac{1}{n + r} = \\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^n \\frac{1}{1 + \\frac{r}{n}}" },
        { step: 2, title: "Convert to definite integral using r/n -> x and 1/n -> dx", formula: "\\int_0^1 \\frac{1}{1 + x}\\,dx" },
        { step: 3, title: "Evaluate via Fundamental Theorem", formula: "[\\ln(1 + x)]_0^1 = \\ln(2) - \\ln(1) = \\ln(2) \\approx 0.693" }
      ],
      targetAnswer: "ln(2) ≈ 0.693"
    },
    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Leibniz Rule)',
        question: "What is $\\frac{d}{dx} \\left[ \\int_0^{x^2} \\sin(t)\\,dt \\right]$?",
        options: [
          { label: "A", text: "$\\sin(x^2)$", isCorrect: false },
          { label: "B", text: "$2x \\sin(x^2)$", isCorrect: true },
          { label: "C", text: "$\\cos(x^2)$", isCorrect: false },
          { label: "D", text: "$2x \\cos(x^2)$", isCorrect: false }
        ],
        explanation: "By Leibniz Rule: $\\frac{d}{dx}\\int_a^{v(x)} f(t)\\,dt = f(v(x)) \\cdot v'(x) = \\sin(x^2) \\cdot (2x) = 2x\\sin(x^2)$."
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Odd Function Symmetry)',
        question: "Evaluate $\\int_{-\\pi/2}^{\\pi/2} \\left( x^3 + x\\cos x + \\sin^5 x + 1 \\right) dx$.",
        options: [
          { label: "A", text: "$0$", isCorrect: false },
          { label: "B", text: "$\\pi$", isCorrect: true },
          { label: "C", text: "$2\\pi$", isCorrect: false },
          { label: "D", text: "$1$", isCorrect: false }
        ],
        explanation: "Symmetry Shortcut! $x^3$, $x\\cos x$, and $\\sin^5 x$ are all ODD functions ($f(-x) = -f(x)$), so their integrals over $[-\\pi/2, \\pi/2]$ evaluate to EXACTLY ZERO! Only $\\int_{-\\pi/2}^{\\pi/2} 1\\,dx = \\pi/2 - (-\\pi/2) = \\pi$ remains!"
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Discontinuous Integrand Trap)',
        question: "Why is the calculation $\\int_{-1}^1 \\frac{1}{x^2}\\,dx = \\left[ -\\frac{1}{x} \\right]_{-1}^1 = -1 - (1) = -2$ completely ILLEGAL and FALSE?",
        options: [
          { label: "A", text: "The power rule cannot be used for negative exponents.", isCorrect: false },
          { label: "B", text: "The integrand $1/x^2 > 0$ everywhere, so its area cannot be negative; the function blows up at $x = 0$ (improper integral diverging to $+\\infty$).", isCorrect: true },
          { label: "C", text: "Upper and lower limits must have opposite signs.", isCorrect: false },
          { label: "D", text: "The answer should be $+2$.", isCorrect: false }
        ],
        explanation: "Classic Student Trap! FTC requires $f(x)$ to be CONTINUOUS on $[a,b]$. Here $1/x^2$ has an infinite discontinuity at $x = 0$. Since $1/x^2 > 0$ everywhere, its integral must be positive ($+\\infty$), not $-2$!"
      }
    ]
  },

  // 7. Biology Topic (BiPC): Cellular Respiration & Chemiosmotic ATP Synthesis
  {
    id: 'biology-atp',
    title: "Cellular Respiration & Chemiosmotic ATP Synthesis",
    shortName: "Chemiosmotic ATP Synthesis",
    grade: "Class 11",
    subject: "Biology",
    chapter: "Respiration in Plants",
    tags: ["Biochemistry", "Mitochondria", "Electron Transport Chain", "Proton Gradient", "Bioenergetics"],
    formulaLatex: "\\text{ADP} + \\text{P}_i + 3\\text{H}^+_{intermembrane} \\xrightarrow{\\text{ATP Synthase}} \\text{ATP} + \\text{H}_2\\text{O} + 3\\text{H}^+_{matrix}",
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "High-energy electrons from NADH/FADH2 power proton pumps across the inner mitochondrial membrane, creating a proton electrochemical gradient (pmf) that drives the rotary motor ATP Synthase to generate ATP.",
      intuitiveBreakdown: {
        Foundation: {
          English: "Think of a hydroelectric dam! Water is pumped high up into a reservoir against gravity. When the floodgates open, the rushing water spins a giant mechanical turbine that generates electricity. In your cells, mitochondria pump protons ($H^+$) into the intermembrane space (the reservoir). As protons rush back through a microscopic turbine called ATP Synthase, it spins like a rotary motor to snap phosphate onto ADP, producing ATP!",
          Hinglish: "Mitochondria ko ek Hydroelectric Dam samjho! Protons ($H^+$) ko pump karke reservoir me jama kiya jaata hai. Jab protons wapas aate hain, woh ATP Synthase naamak ek nanoscopic turbine ko ghumate hain, jisse cell ki energy currency (ATP) banti hai.",
          Tenglish: "Mitochondria ni oka Hydroelectric Dam tho compare cheyyandi. Protons ni reservoir lo store chesinatlu intermembrane space lo store chestaru. Avi ATP Synthase aney molecular turbine dwara rotate ayyi ATP energy ni produce chestayi."
        },
        Intermediate: {
          English: "Peter Mitchell's Chemiosmotic Hypothesis links the Electron Transport Chain (Complexes I, III, IV) with oxidative phosphorylation. Protons are translocated across the inner mitochondrial membrane creating proton motive force: $\\Delta p = \\Delta \\psi - \\frac{2.3 RT}{F}\\Delta \\text{pH}$. The $F_0$ subunit acts as a proton channel while the $F_1$ catalytic head undergoes conformational changes (Open, Loose, Tight) to synthesize ATP.",
          Hinglish: "Peter Mitchell ki Chemiosmotic Hypothesis show karti hai ki ETC complexes (I, III, IV) protons ko matrix se intermembrane space me bhejte hain. Isse proton motive force $\\Delta p$ banti hai. $F_0$ unit se proton pass hote hain aur $F_1$ catalytic head rotate hokar ADP + Pi ko ATP me convert karta hai.",
          Tenglish: "Chemiosmotic hypothesis prakaram Complexes I, III, IV protons ni pump chesi proton motive force ni create chestayi. ATP Synthase yokka $F_0$ and $F_1$ units rotation dwara ATP synthesize avtundi."
        },
        Advanced: {
          English: "Thermodynamic coupling efficiency of the proton-motive force: $\\Delta G_{ATP} \\approx +50\\text{ kJ/mol}$ in vivo. Four protons ($3\\text{H}^+$ for ATP synthesis $+ 1\\text{H}^+$ for phosphate translocase symport) are required per synthesized ATP molecule. The rotary c-ring stoichiometry (typically 8-10 c-subunits in vertebrates) determines the exact H+/ATP ratio.",
          Hinglish: "Bioenergetics me 1 ATP molecule banane ke liye 4 protons lagte hain ($3H^+$ rotary motor ke liye $+ 1H^+$ phosphate symporter ke liye). Vertebrate c-ring stoichiometry exact H+/ATP ratio decide karti hai.",
          Tenglish: "Bioenergetics lo 1 ATP molecule synthesis kosam 4 protons required avtayi ($3H^+ + 1H^+$ symport). Rotary c-ring structure H+/ATP ratio ni determine chestundi."
        }
      },
      formalBoardDefinition: "The Chemiosmotic Hypothesis, proposed by Peter Mitchell, states that ATP synthesis in mitochondria and chloroplasts is driven by an electrochemical proton gradient across the inner membrane generated by electron transport.",
      boardEquations: [
        { label: "Proton Motive Force (pmf)", latex: "\\Delta p = \\Delta \\psi - \\frac{2.303 RT}{F} \\Delta \\text{pH} \\approx 180\\text{ to } 220\\text{ mV}" },
        { label: "ATP Synthesis Balance", latex: "\\text{NADH} + \\frac{1}{2}\\text{O}_2 + \\text{H}^+ + 2.5\\text{ADP} + 2.5\\text{P}_i \\longrightarrow \\text{NAD}^+ + \\text{H}_2\\text{O} + 2.5\\text{ATP}" }
      ],
      variableKeys: [
        { symbol: "\\Delta p", meaning: "Proton motive force", unit: "Millivolts (mV)" },
        { symbol: "\\Delta \\psi", meaning: "Membrane electrical potential", unit: "mV" },
        { symbol: "\\Delta \\text{pH}", meaning: "pH differential across membrane", unit: "pH units" }
      ],
      examSteps: [
        "Step 1: Identify electron donors: NADH yields ~2.5 ATP (enters Complex I); FADH2 yields ~1.5 ATP (enters Complex II).",
        "Step 2: Trace electron path: Complex I/II -> Ubiquinone (CoQ) -> Complex III -> Cytochrome c -> Complex IV -> Oxygen (terminal acceptor).",
        "Step 3: State proton pumping complexes: Complexes I (4H+), III (4H+), IV (2H+).",
        "Step 4: Conclude: Protons flow back through $F_0-F_1$ ATP Synthase to drive phosphorylation of ADP."
      ]
    },
    layer2: {
      title: "Live Real-World Application: Cyanide Poisoning & DNP Fat-Burning Toxicity",
      applicationTitle: "Mitochondrial Inhibitors & Uncouplers in Medicine and Toxicology",
      caseStudy: {
        English: "Why is cyanide lethal within seconds? Cyanide ($CN^-$) binds irreversibly to the iron in Cytochrome c Oxidase (Complex IV), instantly freezing the electron transport chain. Proton pumping ceases, the proton gradient collapses, and cellular ATP production halts immediately, suffocating cells while blood remains saturated with oxygen. Conversely, the infamous illicit fat-burning chemical 2,4-Dinitrophenol (DNP) acts as a proton uncoupler: it shuttles protons across the inner membrane without passing through ATP Synthase! The body burns enormous amounts of glucose and fat trying to rebuild the gradient, dissipating all energy as lethal runaway body heat ($> 42^\\circ\\text{C}$), cooking internal organs.",
        Hinglish: "Cyanide seconds me jaan kyu le leta hai? Cyanide Complex IV (Cytochrome c oxidase) ko block kar deta hai, jisse electron transport ruk jaata hai aur cells me ATP banna band ho jaata hai. DNP chemical proton gradient ko leak kar deta hai, jisse body fat toh burn hota hai par saari energy jaanleva heat me convert hokar sharir ko ubaal deti hai!",
        Tenglish: "Cyanide seconds lo fatal ga enduku avtundo telusa? Complex IV ni block chesi ATP production ni stop chestundi. DNP chemical protons ni leak chesi uncoupling chestundi, daani valla lethal body temperature perigi organs damage avtayi."
      },
      engineeringDiagramConcept: "Complex I-IV Proton Pump -> Uncoupler Leak vs ATP Synthase Phosphorylation",
      realWorldExamples: [
        "Cyanide antidote treatment (Hydroxocobalamin / Sodium thiosulfate)",
        "Brown Adipose Tissue (BAT) Thermogenin (UCP1) keeping newborn human babies warm",
        "Carbon Monoxide (CO) poisoning blocking Complex IV and hemoglobin",
        "Oligomycin antibiotic targeting the F0 subunit of bacterial ATP synthase"
      ]
    },
    layer3: {
      title: "Origin Story: Peter Mitchell & The Bioenergetics Rebel (1961)",
      hero: "Peter Dennis Mitchell",
      era: "1961, Glynn Research Laboratories, Cornwall, UK",
      narrative: {
        English: "In the 1950s, the biochemical establishment was convinced that ATP synthesis must involve a high-energy chemical intermediate, similar to substrate-level phosphorylation in glycolysis. Scientists spent decades hunting for this mysterious 'compound X', failing repeatedly. In 1961, eccentric British biochemist Peter Mitchell proposed a radical idea: there is no high-energy chemical intermediate at all! Mitchell suggested that the energy was stored physically across the membrane as an electrical battery (a proton gradient). The biochemical orthodoxy ridiculed him so fiercely that Mitchell resigned from academia, built his own private research laboratory in a secluded mansion in Cornwall with family funds, and proved his theory experimentally. In 1978, the establishment conceded and awarded Mitchell the Nobel Prize in Chemistry.",
        Hinglish: "1950s me scientists sochte the ki ATP banane ke liye koi mysterious chemical 'Compound X' hota hai. 1961 me Peter Mitchell ne bola ki koi chemical nahi hai, balki energy membrane ke across battery ki tarah proton gradient me store hoti hai. Scientists ne unka mazak udaya, par Mitchell ne apne private lab me prove karke 1978 ka Nobel Prize jeet liya.",
        Tenglish: "1950s lo 'Compound X' valla ATP produce avtundani anukunevaru. Peter Mitchell proton electrochemical gradient dwara idi jarugutundani cheppi, 1978 lo Nobel Prize pondaru."
      },
      epiphanyKey: "Vectorial Metabolism: Biochemical energy can be stored spatially and mechanically as a membrane ion gradient rather than in a high-energy chemical bond."
    },
    layer4: {
      title: "Beyond the Horizon: The 100% Efficiency Reversal Paradox",
      paradoxQuestion: "ATP Synthase is a reversible rotary motor. If you artificially flood a bacterium with massive excess ATP while removing the proton gradient, what does the enzyme do?",
      hint: "Enzymes catalyze reactions in both directions depending on substrate concentrations.",
      explanation: {
        English: "ATP Synthase operates as an ATP-driven proton pump in reverse! It hydrolyzes ATP back into ADP + Inorganic Phosphate, using the released energy to rotate its central stalk in reverse and pump protons OUT of the cell, establishing an artificial proton gradient! Many anaerobic bacteria routinely use ATP Synthase in reverse to regulate cellular pH and power flagellar swimming.",
        Hinglish: "ATP Synthase dono directions me ghum sakta hai! Agar ATP excess me ho, toh enzyme ulta ghumkar ATP ko todkar protons ko bahar pump karne lagta hai taaki cell ka pH maintain ho sake!",
        Tenglish: "ATP Synthase reversible motor ga act chestundi. Excess ATP unnappudu reverse ga rotate ayyi ATP ni hydrolyze chesi protons ni bayataki pump chestundi."
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "The enzyme breaks down and denatures immediately.", isCorrect: false, feedback: "Incorrect. The rotary mechanism is durable and biologically reversible." },
        { id: 'b', text: "It spins in reverse, hydrolyzing ATP to pump protons and rebuild the gradient.", isCorrect: true, feedback: "Beyond Thinking Mastered! ATP Synthase is a reversible molecular machine!" },
        { id: 'c', text: "It begins producing glucose directly.", isCorrect: false, feedback: "Incorrect. Glucose synthesis requires gluconeogenesis pathway." }
      ]
    },
    derivationChallenge: {
      question: "Calculate the theoretical maximum number of ATP molecules generated from the complete aerobic oxidation of 1 molecule of Glucose ($C_6H_{12}O_6$), given: 10 NADH (yielding 2.5 ATP each), 2 FADH2 (yielding 1.5 ATP each), and 4 ATP from substrate-level phosphorylation.",
      steps: [
        { step: 1, title: "Substrate-Level Phosphorylation", formula: "\\text{Glycolysis (net 2 ATP)} + \\text{Krebs Cycle (2 GTP/ATP)} = 4\\text{ ATP}" },
        { step: 2, title: "Oxidative Phosphorylation from NADH", formula: "10\\text{ NADH} \\times 2.5\\text{ ATP/NADH} = 25\\text{ ATP}" },
        { step: 3, title: "Oxidative Phosphorylation from FADH2", formula: "2\\text{ FADH}_2 \\times 1.5\\text{ ATP/FADH}_2 = 3\\text{ ATP} \\implies \\text{Total} = 4 + 25 + 3 = 32\\text{ ATP}" }
      ],
      targetAnswer: "32 ATP molecules (Modern P/O ratio standard)"
    },
    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Proton Pumping)',
        question: "Which of the mitochondrial Electron Transport Chain complexes does NOT pump protons across the inner membrane?",
        options: [
          { label: "A", text: "Complex I (NADH Dehydrogenase)", isCorrect: false },
          { label: "B", text: "Complex II (Succinate Dehydrogenase)", isCorrect: true },
          { label: "C", text: "Complex III (Cytochrome bc1)", isCorrect: false },
          { label: "D", text: "Complex IV (Cytochrome c Oxidase)", isCorrect: false }
        ],
        explanation: "Complex II (Succinate Dehydrogenase) does not span the entire membrane and does NOT pump protons. It only transfers electrons from FADH2 to CoQ."
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Uncoupler Temperature Spike)',
        question: "A patient accidentally ingests DNP (an uncoupling agent). What happens to oxygen consumption and body temperature?",
        options: [
          { label: "A", text: "Oxygen consumption stops; temperature drops rapidly.", isCorrect: false },
          { label: "B", text: "Oxygen consumption skyrockets while body temperature spikes dangerously high.", isCorrect: true },
          { label: "C", text: "Both oxygen consumption and temperature remain constant.", isCorrect: false },
          { label: "D", text: "ATP synthesis increases 10-fold.", isCorrect: false }
        ],
        explanation: "Because the proton gradient leaks through DNP, no ATP is made to feedback-inhibit the ETC. The electron transport chain runs at maximum speed consuming tons of oxygen, dissipating all energy as dangerous uncontrolled heat (hyperthermia)!"
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Terminal Electron Acceptor)',
        question: "What is the ultimate chemical fate of the oxygen ($O_2$) you inhale into your lungs during cellular respiration?",
        options: [
          { label: "A", text: "It is converted into Carbon Dioxide ($CO_2$).", isCorrect: false },
          { label: "B", text: "It is reduced to Water ($H_2O$) at Complex IV.", isCorrect: true },
          { label: "C", text: "It directly binds to ADP to form ATP.", isCorrect: false },
          { label: "D", text: "It dissolves in cytoplasm as hydrogen peroxide.", isCorrect: false }
        ],
        explanation: "Major Student Misconception! Most students think inhaled $O_2$ turns into exhaled $CO_2$. In reality, $CO_2$ comes from the carbon skeleton in the Krebs cycle. The inhaled $O_2$ acts as the terminal electron acceptor and is reduced into pure metabolic WATER ($H_2O$)!"
      }
    ]
  },

  // 8. B.Tech / Engineering Topic: Binary Search Trees & Balanced Rotations
  {
    id: 'btech-dsa-bst',
    title: "Binary Search Trees & AVL Balanced Rotations",
    shortName: "AVL Trees & Balanced Search",
    grade: "B.Tech",
    subject: "Data Structures & Algorithms",
    chapter: "Trees & Complexity",
    tags: ["Computer Science", "Algorithms", "Binary Search Trees", "Time Complexity", "AVL Rotations"],
    formulaLatex: "T(n) = O(\\log n) \\quad ; \\quad \\text{Balance Factor } BF = h_{left} - h_{right} \\in \\{-1, 0, 1\\}",
    layer1: {
      title: "Core Concept & Exam Steps",
      summary: "A self-balancing Binary Search Tree maintains $O(\\log n)$ height by applying constant-time tree rotations whenever a node's balance factor exceeds $[-1, +1]$.",
      intuitiveBreakdown: {
        Foundation: {
          English: "Imagine a phone book where entries are arranged in a tree. If you insert numbers already in sorted order (1, 2, 3, 4, 5), an ordinary binary search tree degenerates into a skinny linked list! Searching takes $O(n)$ slow time. An AVL tree acts like a self-leveling gymnast: the second one side gets 2 steps taller than the other, it performs a quick pivot rotation to level the tree back into a balanced pyramid, restoring lightning-fast $O(\\log n)$ search!",
          Hinglish: "Agar aap BST me sorted data (1, 2, 3, 4, 5) daaloge, toh tree ek seedhi lambi line (linked list) ban jaati hai aur search slow $O(n)$ ho jaata hai. AVL tree ek smart self-balancing tree hai jo balance factor check karta hai. Jaise hi koi side 2 levels lambi hoti hai, woh tree ko rotate karke pyramid shape bana deta hai taaki search hamesha $O(\\log n)$ speed me ho.",
          Tenglish: "Sorted elements ni BST lo insert cheste adi linked list ga degenerate ayyi $O(n)$ slow aipothundi. AVL tree balance factor ni calculate chesi, height difference > 1 avvagane left/right rotations perform chesi $O(\\log n)$ search speed ni maintain chestundi."
        },
        Intermediate: {
          English: "The balance factor is defined as $BF(N) = \\text{height}(N.left) - \\text{height}(N.right)$. There are four rotation cases: 1) Left-Left (Single Right Rotation), 2) Right-Right (Single Left Rotation), 3) Left-Right (Left rotate child, then Right rotate parent), 4) Right-Left (Right rotate child, then Left rotate parent). Each rotation updates pointers in $O(1)$ constant time.",
          Hinglish: "Balance Factor $BF = h_{left} - h_{right}$ hota hai. Chaar rotation cases hote hain: LL (Right rotation), RR (Left rotation), LR (Left then Right), aur RL (Right then Left). Har rotation pointer changes se $O(1)$ constant time me complete hoti hai.",
          Tenglish: "Balance Factor $BF = h_{left} - h_{right}$. 4 cases untayi: LL, RR, LR, RL. Prathi rotation pointer adjustments dwara $O(1)$ constant time lo execute avtundi."
        },
        Advanced: {
          English: "For an AVL tree of height $h$, the minimum number of nodes is governed by Fibonacci recurrence: $N(h) = N(h-1) + N(h-2) + 1$. Solving the characteristic equation yields $N(h) \\approx \\frac{\\phi^{h+2}}{\\sqrt{5}} - 1$, proving worst-case height is strictly bounded by $h < 1.44 \\log_2 n$. This makes AVL trees faster for lookups than Red-Black trees (which have a higher bound of $2\\log_2 n$).",
          Hinglish: "AVL tree ki minimum nodes Fibonacci recurrence $N(h) = N(h-1) + N(h-2) + 1$ follow karti hain. Iska solution deta hai ki max height $1.44 \\log_2 n$ se choti hoti hai. Red-Black trees ($2\\log_2 n$) ke comparison me AVL trees search lookups ke liye zyada fast hote hain.",
          Tenglish: "Fibonacci recurrence $N(h) = N(h-1) + N(h-2) + 1$ dwara AVL max height $1.44 \\log_2 n$ ga prove avtundi. Anduvalla lookup operations lo Red-Black trees kante AVL trees faster ga pani chestayi."
        }
      },
      formalBoardDefinition: "An AVL Tree (Adelson-Velsky and Landis) is a self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one. If at any time they differ by more than one, rebalancing is done to restore this property.",
      boardEquations: [
        { label: "Balance Factor", latex: "BF(node) = \\text{height}(node.left) - \\text{height}(node.right) \\in \\{-1, 0, +1\\}" },
        { label: "Max Height Bound", latex: "h < 1.4404 \\log_2(n + 2) - 0.328" }
      ],
      variableKeys: [
        { symbol: "BF", meaning: "Balance factor of a subtree node", unit: "integer (-1, 0, 1)" },
        { symbol: "h", meaning: "Tree height (edges on longest root-to-leaf path)", unit: "levels" },
        { symbol: "T(n)", meaning: "Time complexity for Search, Insert, and Delete", unit: "O(log n)" }
      ],
      examSteps: [
        "Step 1: Perform standard BST insertion based on key comparison.",
        "Step 2: Trace upward from inserted leaf to root, updating node heights.",
        "Step 3: Check Balance Factor $BF = h_L - h_R$. Find first unbalanced node where $|BF| > 1$.",
        "Step 4: Identify case (LL, RR, LR, RL) and apply corresponding $O(1)$ pointer rotation."
      ]
    },
    layer2: {
      title: "Live Real-World Application: Relational Database Indexes & High-Frequency Trading Engines",
      applicationTitle: "B-Tree Indexes in PostgreSQL/MySQL and In-Memory Order Books",
      caseStudy: {
        English: "When you execute `SELECT * FROM users WHERE email = 'arjun@gmail.com'` on a database with 500 million records, a linear search $O(n)$ would take 10 seconds and freeze the server! Instead, modern database engines (PostgreSQL, MySQL, SQLite) store table indexes in generalized balanced multi-way search trees called B+ Trees (derived directly from AVL tree balancing principles). Even with 500,000,000 rows, a balanced tree has a height of only 4 levels! The database finds your exact record in just 4 disc accesses ($< 0.002$ milliseconds). In Wall Street High-Frequency Trading (HFT) matching engines, AVL trees maintain live bid/ask order books, matching million-dollar trades in nanoseconds.",
        Hinglish: "Jab aap 500 million users ke database me search karte ho, linear search me 10 seconds lag jayenge. Database engines (Postgres, MySQL) balanced trees (B+ Trees) use karte hain. 500 million records hone par bhi tree ki height sirf 4 hoti hai! Sirf 4 hops me 0.002 milliseconds ke andar user mil jaata hai.",
        Tenglish: "500 million records unna database lo linear search cheste seconds time paduthundi. Balanced search trees vadadam valla tree height kevalam 4 levels untundi, fractions of milliseconds lo record retrieve avtundi."
      },
      engineeringDiagramConcept: "Insert -> Height Imbalance (BF = +2) -> O(1) Pivot Rotation -> Balanced Tree",
      realWorldExamples: [
        "Database primary key B-Tree indexing (PostgreSQL, Oracle, MySQL)",
        "Stock exchange NASDAQ / NSE order matching book engines",
        "Linux OS Kernel process scheduling (Completely Fair Scheduler uses Red-Black Tree)",
        "Git revision commit graph and directory search trees"
      ]
    },
    layer3: {
      title: "Origin Story: Georgy Adelson-Velsky & Evgenii Landis (1962)",
      hero: "G.M. Adelson-Velsky & E.M. Landis",
      era: "1962, Institute of Theoretical and Experimental Physics, Moscow",
      narrative: {
        English: "In the dawn of early computing in 1962, memory was precious and clock cycles were counted in thousands, not billions. Programmers discovered Binary Search Trees, but were horrified to find that inserting ordered data collapsed performance into an $O(n)$ crawl. Two Soviet mathematicians, Georgy Adelson-Velsky and Evgenii Landis, published an 8-page paper entitled 'An Algorithm for the Organization of Information'. They proved that by tracking just two bits of balance information per node and executing local pointer swaps, an algorithm could guarantee logarithmic performance forever. It was the very first self-balancing data structure ever invented in computer science history!",
        Hinglish: "1962 me computer memory bohot kam hoti thi. Programmers ne BST banaya par dekha ki sorted data se performance crash ho jaata hai. Do Russian mathematicians Adelson-Velsky aur Landis ne 8 page ka paper likha aur prove kiya ki local pointer rotations se tree ko hamesha balanced rakha ja sakta hai. Ye computer science ki pehli self-balancing data structure thi!",
        Tenglish: "1962 lo Adelson-Velsky and Landis aney iddaru Russian mathematicians computer science history lo first self-balancing tree ni invent chesaru, daanine AVL Tree antamu."
      },
      epiphanyKey: "Local Invariance Guarantees Global Balance: Rebalancing a single local triangle of 3 nodes after each insertion guarantees the entire million-node tree never exceeds $O(\\log n)$ height."
    },
    layer4: {
      title: "Beyond the Horizon: The AVL vs Red-Black Tree Tradeoff",
      paradoxQuestion: "Both AVL Trees and Red-Black Trees guarantee $O(\\log n)$ operations. Why does the Linux Kernel choose Red-Black Trees for memory virtual memory areas (VMAs), while in-memory lookup search caches prefer AVL Trees?",
      hint: "Compare the cost and frequency of rebalancing rotations during rapid insertions versus lookups.",
      explanation: {
        English: "AVL trees are strictly balanced (height bounded by $1.44\\log n$), making lookup searches noticeably faster because paths are shorter. However, keeping this rigid balance requires frequent rotations on insertion and deletion. Red-Black trees relax balance constraints (height bounded by $2\\log n$), requiring at most 2 rotations per insertion. In operating systems where memory allocations and frees happen millions of times per second (heavy write workloads), Red-Black trees win; for read-heavy static dictionaries, AVL trees dominate!",
        Hinglish: "AVL trees bohot strictly balanced hote hain ($1.44\\log n$), isliye search fast hoti hai par insert/delete par rotations zyada hoti hain. Red-Black trees thoda loose balance rakhte hain ($2\\log n$) jisse rotations kam lagti hain. Linux Kernel me constantly memory allocate aur free hoti hai, isliye Red-Black tree use hota hai!",
        Tenglish: "AVL trees search operations lo faster ($1.44\\log n$), kaani insertions lo rotations ekkuva avtayi. Red-Black trees insertions lo faster kabatti Linux Kernel memory management lo Red-Black trees ni choose chesindi."
      },
      interactiveHypothesisOptions: [
        { id: 'a', text: "AVL trees consume 100 times more memory.", isCorrect: false, feedback: "Incorrect. Both use only a few extra bits per node." },
        { id: 'b', text: "AVL has faster lookups (shorter paths), but Red-Black has faster insertions (fewer rotations).", isCorrect: true, feedback: "Beyond Thinking Mastered! You understood the fundamental algorithmic read-heavy vs write-heavy engineering tradeoff!" },
        { id: 'c', text: "Red-Black trees run in $O(1)$ constant time.", isCorrect: false, feedback: "Incorrect. Both are strictly $O(\\log n)$." }
      ]
    },
    derivationChallenge: {
      question: "Insert the keys in order: [10, 20, 30]. Identify the unbalance and show the rotation step to balance into an AVL tree.",
      steps: [
        { step: 1, title: "Insert 10, then 20 (Right child)", formula: "10 \\to 20 \\quad \\text{Heights: h(10)=2, h(20)=1. Balance Factor BF(10) = 0 - 1 = -1}" },
        { step: 2, title: "Insert 30 (Right child of 20)", formula: "10 \\to 20 \\to 30 \\quad \\text{BF(10) = 0 - 2 = -2 (Unbalanced! Case: Right-Right RR)}" },
        { step: 3, title: "Perform Single Left Rotation on node 10", formula: "\\text{Node 20 becomes new root, with 10 as left child and 30 as right child. Heights: h(20)=2, BF=0 (Balanced!)}" }
      ],
      targetAnswer: "Root = 20, Left = 10, Right = 30 (RR Single Left Rotation)"
    },
    twistedQuiz: [
      {
        id: 'q1',
        type: 'Direct Retrieval (Balance Factor)',
        question: "What are the only acceptable Balance Factor values for any valid node in an AVL tree?",
        options: [
          { label: "A", text: "$\\{0\\}$ only", isCorrect: false },
          { label: "B", text: "$\\{-1, 0, +1\\}$", isCorrect: true },
          { label: "C", text: "$\\{-2, -1, 0, 1, 2\\}$", isCorrect: false },
          { label: "D", text: "Any positive integer", isCorrect: false }
        ],
        explanation: "By definition, an AVL tree node is balanced if and only if $|BF| = |h_{left} - h_{right}| \\le 1$, meaning $BF \\in \\{-1, 0, +1\\}$."
      },
      {
        id: 'q2',
        type: 'Twisted Real-World Scenario (Double Rotation Trap)',
        question: "In an AVL tree, node 50 has a left child 20. A new node 35 is inserted as the right child of 20. What specific rotation sequence is required to restore balance?",
        options: [
          { label: "A", text: "Single Right Rotation on 50", isCorrect: false },
          { label: "B", text: "Single Left Rotation on 20", isCorrect: false },
          { label: "C", text: "Left-Right (LR) Double Rotation: Left rotate on 20, then Right rotate on 50", isCorrect: true },
          { label: "D", text: "No rotation needed", isCorrect: false }
        ],
        explanation: "The insertion occurred in the Right subtree of the Left child (Left-Right zigzag case). A single rotation cannot fix a zigzag shape; you must first rotate Left on child 20 to straighten the line, then rotate Right on parent 50!"
      },
      {
        id: 'q3',
        type: 'Misconception Buster (Worst Case Degeneration)',
        question: "If you insert 1,000,000 strictly sorted numbers into an AVL Tree, what is the maximum search time complexity?",
        options: [
          { label: "A", text: "$O(n)$ linear time like a linked list", isCorrect: false },
          { label: "B", text: "$O(\\log n)$ logarithmic time (~20 comparisons)", isCorrect: true },
          { label: "C", text: "$O(n \\log n)$ time", isCorrect: false },
          { label: "D", text: "$O(1)$ constant time", isCorrect: false }
        ],
        explanation: "The hallmark superpower of AVL trees! While an ordinary BST degenerates to $O(n)$ on sorted inputs, an AVL tree continuously rotates to preserve height $h < 1.44\\log_2 n$. For $1,000,000$ items, maximum search path is only ~28 pointer hops!"
      }
    ]
  }
];

export function getTopicById(id) {
  return DEMO_TOPICS.find(t => t.id === id) || DEMO_TOPICS[0];
}

export function searchTopics(query) {
  if (!query) return DEMO_TOPICS;
  const q = query.toLowerCase();
  return DEMO_TOPICS.filter(t => 
    t.title.toLowerCase().includes(q) ||
    t.subject.toLowerCase().includes(q) ||
    t.chapter.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

export function getTopicsForSubject(subjectName) {
  if (!subjectName) return DEMO_TOPICS;
  const s = subjectName.toLowerCase();
  const filtered = DEMO_TOPICS.filter(t => {
    const topicSubj = t.subject.toLowerCase();
    if (s.includes('physics') && topicSubj.includes('physics')) return true;
    if (s.includes('chem') && topicSubj.includes('chem')) return true;
    if (s.includes('math') && topicSubj.includes('math')) return true;
    if (s.includes('bio') && topicSubj.includes('bio')) return true;
    if ((s.includes('data') || s.includes('dsa') || s.includes('circuit') || s.includes('mechanic')) && 
        (topicSubj.includes('data') || topicSubj.includes('algorithm') || topicSubj.includes('engineering') || topicSubj.includes('physics'))) return true;
    return topicSubj.includes(s) || s.includes(topicSubj);
  });
  return filtered.length > 0 ? filtered : DEMO_TOPICS;
}

