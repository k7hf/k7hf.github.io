window.WORLDDOJO_CONTENT = {
  "title": "WorldDojo",
  "description": "Evaluating embodied world models across object generalization, spatial consistency, horizon memory, and causal response.",
  "overview": "WorldDojo organizes embodied world-model evaluation into four complementary suites and three difficulty levels. It examines whether predicted visual trajectories preserve objects, spatial relationships, memory through occlusion, and the consequences of interventions.",
  "stats": [
    {
      "value": "4",
      "label": "Evaluation suites"
    },
    {
      "value": "3",
      "label": "Difficulty levels"
    },
    {
      "value": "2,400",
      "label": "Simulation test trajectories"
    }
  ],
  "statsSourceDate": "2026-11-17",
  "statsNote": "Each of the four suites contributes 200 LIBERO test trajectories at each of three difficulty levels. The real-world test set contains a further 1,600 trajectories.",
  "figures": [
    {
      "id": "framework",
      "title": "WorldDojo at a glance",
      "src": "worlddojo/paper-figures/figure-01-overview.svg",
      "caption": "Four evaluation dimensions at three difficulty levels, with representative recorded trajectories and the evaluation pipeline."
    },
    {
      "id": "composition",
      "title": "Test-set composition and trajectory distribution",
      "src": "worlddojo/paper-figures/figure-02-dataset-overview.png",
      "caption": "Test-set composition by suite, level, and test mode. Joint t-SNE of dual-view video features from WorldDojo and official successful demonstrations."
    }
  ],
  "suites": [
    {
      "id": "OG",
      "name": "Object Generalization",
      "color": "#00888b",
      "description": "Objects involved in the interaction and background distractors both vary. The three levels cover one changed object, several changed objects, and objects absent from training.",
      "levels": [
        "Single-object variation",
        "Multi-object variation",
        "Unseen-object variation"
      ]
    },
    {
      "id": "SC",
      "name": "Spatial Consistency",
      "color": "#2a5fb8",
      "description": "Evaluate whether object identities and spatial relationships remain consistent as viewpoints change and objects move.",
      "levels": [
        "Fixed layouts under changing viewpoints",
        "Single-object motion",
        "Sequential motion of multiple objects"
      ]
    },
    {
      "id": "HM",
      "name": "Horizon Memory",
      "color": "#ae770b",
      "description": "Track objects while they are hidden or outside the camera view, then predict their state when they reappear.",
      "levels": [
        "Hiding and reappearance",
        "Repeated occlusions and revisits",
        "State tracking across multiple steps"
      ]
    },
    {
      "id": "CR",
      "name": "Causal Response",
      "color": "#974c91",
      "description": "Evaluate whether predicted outcomes respond to interventions, from direct effects to multi-step physical interactions and multi-factor events.",
      "levels": [
        "Direct trigger–response events",
        "Multi-step event chains",
        "Multi-factor AND / OR events"
      ]
    }
  ],
  "examples": [
    {
      "suite": "OG",
      "level": "L0",
      "sampleId": "OG000540",
      "caption": "A red mug is lifted and placed on the stove.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/OG000540.mp4",
      "durationSeconds": 8.2,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/OG000540.webp"
    },
    {
      "suite": "OG",
      "level": "L1",
      "sampleId": "OG110540",
      "caption": "A red mug is lifted and placed onto a plate.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/OG110540.mp4",
      "durationSeconds": 7.3,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/OG110540.webp"
    },
    {
      "suite": "OG",
      "level": "L2",
      "sampleId": "OG129033",
      "caption": "An unfamiliar object is lifted and placed onto a board.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/OG129033.mp4",
      "durationSeconds": 18.5,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/OG129033.webp"
    },
    {
      "suite": "SC",
      "level": "L0",
      "sampleId": "SC000954",
      "caption": "The wrist camera changes viewpoint and returns while the scene layout remains fixed.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/SC000954.mp4",
      "durationSeconds": 5.3,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/SC000954.webp"
    },
    {
      "suite": "SC",
      "level": "L1",
      "sampleId": "SC110106",
      "caption": "Moving the red mug updates its spatial relationship to the other objects.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/SC110106.mp4",
      "durationSeconds": 9.0,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/SC110106.webp"
    },
    {
      "suite": "SC",
      "level": "L2",
      "sampleId": "SC120001",
      "caption": "Sequential object movements require the scene to retain each position update.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/SC120001.mp4",
      "durationSeconds": 24.2,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/SC120001.webp"
    },
    {
      "suite": "HM",
      "level": "L0",
      "sampleId": "HM000901",
      "caption": "An object becomes occluded and then reappears.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/HM000901.mp4",
      "durationSeconds": 6.5,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/HM000901.webp"
    },
    {
      "suite": "HM",
      "level": "L1",
      "sampleId": "HM110001",
      "caption": "The same object passes behind two successive occluders.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/HM110001.mp4",
      "durationSeconds": 9.0,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/HM110001.webp"
    },
    {
      "suite": "HM",
      "level": "L2",
      "sampleId": "HM120180",
      "caption": "A hidden object must retain its identity as the covering cups exchange positions.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/HM120180.mp4",
      "durationSeconds": 21.3,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/HM120180.webp"
    },
    {
      "suite": "CR",
      "level": "L0",
      "sampleId": "CR000921",
      "caption": "A grasping attempt leads to successful lifting. The paired alternative demonstrates a different outcome.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/CR000921.mp4",
      "durationSeconds": 7.4,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/CR000921.webp"
    },
    {
      "suite": "CR",
      "level": "L1",
      "sampleId": "CR110455",
      "caption": "Pushing a book initiates contact that topples a box.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/CR110455.mp4",
      "durationSeconds": 10.8,
      "width": 1024,
      "height": 512,
      "poster": "worlddojo/posters/CR110455.webp"
    },
    {
      "suite": "CR",
      "level": "L2",
      "sampleId": "CR120004",
      "caption": "Removing both gates releases the can toward the plate. This is one factual trajectory, not a sequence of different branches.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/CR120004.mp4",
      "durationSeconds": 15.15,
      "width": 1024,
      "height": 512,
      "poster": "worlddojo/posters/CR120004.webp"
    },
    {
      "suite": "SC",
      "level": "L0",
      "sampleId": "SC000981",
      "caption": "The wrist camera revisits a fixed arrangement of objects.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/SC000981.mp4",
      "durationSeconds": 5.45,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/SC000981.webp"
    },
    {
      "suite": "SC",
      "level": "L1",
      "sampleId": "SC110006",
      "caption": "Grasping and placing the cookies changes their spatial relationship to the plate.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/SC110006.mp4",
      "durationSeconds": 8.8,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/SC110006.webp"
    },
    {
      "suite": "SC",
      "level": "L2",
      "sampleId": "SC120006",
      "caption": "The robot grasps the cookies, then pushes the plate, updating both object positions.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/SC120006.mp4",
      "durationSeconds": 25.45,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/SC120006.webp"
    },
    {
      "suite": "HM",
      "level": "L0",
      "sampleId": "HM000961",
      "caption": "The chocolate pudding disappears briefly and then reappears.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/HM000961.mp4",
      "durationSeconds": 9.3,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/HM000961.webp"
    },
    {
      "suite": "HM",
      "level": "L1",
      "sampleId": "HM110101",
      "caption": "The wrist camera visits two object regions and returns to the first.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/HM110101.mp4",
      "durationSeconds": 6.7,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/HM110101.webp"
    },
    {
      "suite": "HM",
      "level": "L2",
      "sampleId": "HM120003",
      "caption": "Objects are revisited after the robot manipulates a separate object in another region.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/HM120003.mp4",
      "durationSeconds": 19.7,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/HM120003.webp"
    },
    {
      "suite": "OG",
      "level": "L0",
      "sampleId": "OG000251",
      "caption": "A yellow-and-white mug is picked up and placed in the basket.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/OG000251.mp4",
      "durationSeconds": 12.3,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/OG000251.webp"
    },
    {
      "suite": "OG",
      "level": "L1",
      "sampleId": "OG110251",
      "caption": "Both interaction objects change: the yellow-and-white mug is placed in a black bowl.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/OG110251.mp4",
      "durationSeconds": 18.1,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/OG110251.webp"
    },
    {
      "suite": "OG",
      "level": "L2",
      "sampleId": "OG129043",
      "caption": "An unfamiliar bell pepper is picked up and placed on a clipboard.",
      "kind": "Recorded ground truth",
      "video": "worlddojo/videos/OG129043.mp4",
      "durationSeconds": 18.8,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/OG129043.webp"
    }
  ],
  "alternatives": [
    {
      "suite": "CR",
      "level": "L0",
      "sampleId": "CR000922",
      "caption": "Paired grasping attempt without successful lifting.",
      "kind": "Recorded ground truth · alternative branch",
      "video": "worlddojo/videos/CR000922.mp4",
      "durationSeconds": 7.4,
      "width": 512,
      "height": 256,
      "poster": "worlddojo/posters/CR000922.webp"
    },
    {
      "suite": "CR",
      "level": "L1",
      "sampleId": "CR110456",
      "caption": "Alternative branch: the attempted push does not topple the box.",
      "kind": "Recorded ground truth · alternative branch",
      "video": "worlddojo/videos/CR110456.mp4",
      "durationSeconds": 10.8,
      "width": 1024,
      "height": 512,
      "poster": "worlddojo/posters/CR110456.webp"
    },
    {
      "suite": "CR",
      "level": "L1",
      "sampleId": "CR110457",
      "caption": "Alternative initial condition: the box starts outside the book path.",
      "kind": "Recorded ground truth · alternative branch",
      "video": "worlddojo/videos/CR110457.mp4",
      "durationSeconds": 10.8,
      "width": 1024,
      "height": 512,
      "poster": "worlddojo/posters/CR110457.webp"
    }
  ],
  "demoNotice": "The Explore the benchmark gallery shows recorded ground-truth demonstrations.",
  "links": {
    "paper": null,
    "code": null,
    "dataset": null
  },
  "realExamples": [
    {
      "suite": "OG",
      "level": "L0",
      "sampleId": "Episode 14",
      "title": "Block and cabinet",
      "video": "worlddojo/real-robot/clips/OG-L0-0eb7e6c3.mp4",
      "poster": "worlddojo/real-robot/clips/OG-L0-0eb7e6c3.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "0eb7e6c3f863667cdacb91ac9852f13e37e93c1d7878ed671712bf021736390e"
    },
    {
      "suite": "OG",
      "level": "L1",
      "sampleId": "Episode 0",
      "title": "Multi-object variation",
      "video": "worlddojo/real-robot/clips/OG-L1-5894055c.mp4",
      "poster": "worlddojo/real-robot/clips/OG-L1-5894055c.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "5894055c02bb5cd60d312af8c4659aee633f0d9e14c993ee51b287efab19db98"
    },
    {
      "suite": "OG",
      "level": "L2",
      "sampleId": "Episode 0",
      "title": "Ball and cup",
      "video": "worlddojo/real-robot/clips/OG-L2-24d5546a.mp4",
      "poster": "worlddojo/real-robot/clips/OG-L2-24d5546a.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "24d5546adfc07c7c472e4fde9c77e062b872a425138045bd935c8044a74d5d1d"
    },
    {
      "suite": "OG",
      "level": "L0",
      "sampleId": "Episode 0",
      "title": "Ball and plate with distractors",
      "video": "worlddojo/real-robot/clips/OG-L0-c5522947.mp4",
      "poster": "worlddojo/real-robot/clips/OG-L0-c5522947.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "c5522947e63e10fa4e5d459a351f8762691e71a3bb0a065a3cf987b523701dcf"
    },
    {
      "suite": "OG",
      "level": "L1",
      "sampleId": "Episode 1",
      "title": "Multi-object variation",
      "video": "worlddojo/real-robot/clips/OG-L1-beef5caf.mp4",
      "poster": "worlddojo/real-robot/clips/OG-L1-beef5caf.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "beef5caf9a30de27140e9d2c2ccd833e1190f9f972d8b49bcdcd88db8842fa55"
    },
    {
      "suite": "OG",
      "level": "L2",
      "sampleId": "Episode 0",
      "title": "Cube and drawer",
      "video": "worlddojo/real-robot/clips/OG-L2-344338f3.mp4",
      "poster": "worlddojo/real-robot/clips/OG-L2-344338f3.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "344338f3561c60f02a43dc1871c377298b09fa69340d76680aeb262b6e906c0e"
    },
    {
      "suite": "SC",
      "level": "L0",
      "sampleId": "Episode 0",
      "title": "Ball layout",
      "video": "worlddojo/real-robot/clips/SC-L0-2206b8ce.mp4",
      "poster": "worlddojo/real-robot/clips/SC-L0-2206b8ce.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "2206b8ce68e42705e9b47505019078912c231c720e750288132ddec9c37063d9"
    },
    {
      "suite": "SC",
      "level": "L1",
      "sampleId": "Episode 0",
      "title": "Cup motion",
      "video": "worlddojo/real-robot/clips/SC-L1-37d41bf4.mp4",
      "poster": "worlddojo/real-robot/clips/SC-L1-37d41bf4.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "37d41bf41b00641344d3a16421c999b21e50b7714b96550235b1602ed826832e"
    },
    {
      "suite": "SC",
      "level": "L2",
      "sampleId": "Episode 0",
      "title": "Sequential motion with a ball",
      "video": "worlddojo/real-robot/clips/SC-L2-9923a648.mp4",
      "poster": "worlddojo/real-robot/clips/SC-L2-9923a648.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "9923a6481192d209be436ef62e925c1165be6af7dd61dbf4af1e388328d1517b"
    },
    {
      "suite": "SC",
      "level": "L0",
      "sampleId": "Episode 0",
      "title": "Block and cup layout",
      "video": "worlddojo/real-robot/clips/SC-L0-25891abb.mp4",
      "poster": "worlddojo/real-robot/clips/SC-L0-25891abb.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "25891abbe18c80818d53c44a9c86c8aa38f9866f8c7d3ed8ac8cd8036d2a35af"
    },
    {
      "suite": "SC",
      "level": "L1",
      "sampleId": "Episode 0",
      "title": "Cube motion",
      "video": "worlddojo/real-robot/clips/SC-L1-bdbd114b.mp4",
      "poster": "worlddojo/real-robot/clips/SC-L1-bdbd114b.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "bdbd114bddcaef1477cc5befc6c0e4ea9991c639d00b0060bfcc2904f04d5788"
    },
    {
      "suite": "SC",
      "level": "L2",
      "sampleId": "Episode 0",
      "title": "Sequential motion with a block",
      "video": "worlddojo/real-robot/clips/SC-L2-f630247b.mp4",
      "poster": "worlddojo/real-robot/clips/SC-L2-f630247b.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "f630247b8bdc6d0f73c6caa5e6068ff1711dc6cf4f5de994df1e72197cd0694f"
    },
    {
      "suite": "HM",
      "level": "L0",
      "sampleId": "Episode 1",
      "title": "Ball occluded by the arm",
      "video": "worlddojo/real-robot/clips/HM-L0-cc57d5c1.mp4",
      "poster": "worlddojo/real-robot/clips/HM-L0-cc57d5c1.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "cc57d5c1f5eb7cebd1aa066323a6c00bf41732d26c4e124d7f451837617f2a4e"
    },
    {
      "suite": "HM",
      "level": "L1",
      "sampleId": "Episode 2",
      "title": "Ball and cup",
      "video": "worlddojo/real-robot/clips/HM-L1-0aa3adfc.mp4",
      "poster": "worlddojo/real-robot/clips/HM-L1-0aa3adfc.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "0aa3adfc02ceb59e5cd02d9923dc7762bc23a381c8a075f777213ab54ef89b1e"
    },
    {
      "suite": "HM",
      "level": "L2",
      "sampleId": "Episode 0",
      "title": "Cup and ball",
      "video": "worlddojo/real-robot/clips/HM-L2-933c59e6.mp4",
      "poster": "worlddojo/real-robot/clips/HM-L2-933c59e6.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "933c59e63fe5d7d5c7956f3d502238ba8c7fb529b1b9e8aeba0932dce2f5ae7c"
    },
    {
      "suite": "HM",
      "level": "L0",
      "sampleId": "Episode 1",
      "title": "Cube in the wrist view",
      "video": "worlddojo/real-robot/clips/HM-L0-33d5bf8a.mp4",
      "poster": "worlddojo/real-robot/clips/HM-L0-33d5bf8a.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "33d5bf8abe14b8f0bb043fe88e5a5768ec10cc4bbebb274fb1b880a572eee10a"
    },
    {
      "suite": "HM",
      "level": "L1",
      "sampleId": "Episode 0",
      "title": "Ball and cube",
      "video": "worlddojo/real-robot/clips/HM-L1-735bd045.mp4",
      "poster": "worlddojo/real-robot/clips/HM-L1-735bd045.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "735bd045130d876c8636cae9e8c57fed0d901916e05b900609b96bfc5d6d1d4d"
    },
    {
      "suite": "HM",
      "level": "L2",
      "sampleId": "Episode 0",
      "title": "Drawer and cube",
      "video": "worlddojo/real-robot/clips/HM-L2-2f3f682b.mp4",
      "poster": "worlddojo/real-robot/clips/HM-L2-2f3f682b.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "2f3f682b041d165c6a8fe93ae826204728fe1bf52def3a041d3d5a5b6d6ff9c1"
    },
    {
      "suite": "CR",
      "level": "L0",
      "sampleId": "Episode 0",
      "title": "Ball handoff",
      "video": "worlddojo/real-robot/clips/CR-L0-19c5b84a.mp4",
      "poster": "worlddojo/real-robot/clips/CR-L0-19c5b84a.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "19c5b84aa597e2e9867fa0ebbb7a24ba5f5aadfa3f38c4cf4195830d6e69ca43"
    },
    {
      "suite": "CR",
      "level": "L1",
      "sampleId": "Episode 0",
      "title": "Ball collision",
      "video": "worlddojo/real-robot/clips/CR-L1-51e63f96.mp4",
      "poster": "worlddojo/real-robot/clips/CR-L1-51e63f96.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "51e63f96afb6306d186f78e20844e354d07f775f9398736cf277ba1d64149d18"
    },
    {
      "suite": "CR",
      "level": "L2",
      "sampleId": "Episode 0",
      "title": "Ball and drawer · AND condition 00",
      "video": "worlddojo/real-robot/clips/CR-L2-ac0cee3c.mp4",
      "poster": "worlddojo/real-robot/clips/CR-L2-ac0cee3c.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "ac0cee3c180ae1b28efafd0b7a61ee28e2bafab97a09873def49a01a529c4bf0"
    },
    {
      "suite": "CR",
      "level": "L0",
      "sampleId": "Episode 26",
      "title": "Cup grasp",
      "video": "worlddojo/real-robot/clips/CR-L0-5c330d59.mp4",
      "poster": "worlddojo/real-robot/clips/CR-L0-5c330d59.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "5c330d59b016a5f2ee7a33b30168f4233381b891416bb08368b1135880bdf01c"
    },
    {
      "suite": "CR",
      "level": "L1",
      "sampleId": "Episode 0",
      "title": "Drawer and ball",
      "video": "worlddojo/real-robot/clips/CR-L1-515162b4.mp4",
      "poster": "worlddojo/real-robot/clips/CR-L1-515162b4.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "515162b4fe6d07dba219deef235bd62a698c06ecbd1b597de9dba3f8716f55b7"
    },
    {
      "suite": "CR",
      "level": "L2",
      "sampleId": "Episode 1",
      "title": "Ball and drawer · AND condition 11",
      "video": "worlddojo/real-robot/clips/CR-L2-fbe7498e.mp4",
      "poster": "worlddojo/real-robot/clips/CR-L2-fbe7498e.webp",
      "width": 1920,
      "height": 960,
      "sourceEpisode": "fbe7498e68764731e8e0082bcc90e28c63254184fdaea939480804e290471922"
    }
  ]
};
