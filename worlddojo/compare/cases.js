window.WORLDDOJO_COMPARE = {
  "sim": [
    {
      "suite": "OG",
      "level": "L0",
      "model": "BWM · WorldDojo L0",
      "sample": "OG000540",
      "frame": 116,
      "marker": {
        "x": 84,
        "y": 35,
        "label": "The reference gripper tips sideways over the burner. The predicted gripper remains more upright."
      },
      "reference": "worlddojo/compare/sim/og000540-reference.webp",
      "prediction": "worlddojo/compare/sim/og000540-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/og000540-libero.webp",
        "worlddojo": "worlddojo/compare/sim/og000540-prediction.webp",
        "trainingNote": "The LIBERO-trained model shows a dark, flattened shape beneath the gripper. The WorldDojo-trained model predicts an upright red mug."
      }
    },
    {
      "suite": "OG",
      "level": "L1",
      "model": "BWM · WorldDojo L0",
      "sample": "OG110103",
      "frame": 322,
      "marker": {
        "x": 78,
        "y": 61,
        "label": "The red object lies tilted across the burner in the reference but stands upright in the prediction."
      },
      "reference": "worlddojo/compare/sim/og110103-reference.webp",
      "prediction": "worlddojo/compare/sim/og110103-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/og110103-libero.webp",
        "worlddojo": "worlddojo/compare/sim/og110103-prediction.webp",
        "trainingNote": "The red object stays beside the burner in the LIBERO-trained prediction. It stands on the burner in the WorldDojo-trained prediction."
      }
    },
    {
      "suite": "OG",
      "level": "L2",
      "model": "BWM · WorldDojo L0",
      "sample": "OG120019",
      "frame": 272,
      "marker": {
        "x": 20,
        "y": 52,
        "label": "The red object beside the burner has a different shape in the prediction."
      },
      "reference": "worlddojo/compare/sim/og120019-reference.webp",
      "prediction": "worlddojo/compare/sim/og120019-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/og120019-libero.webp",
        "worlddojo": "worlddojo/compare/sim/og120019-prediction.webp",
        "trainingNote": "The red object beside the burner appears dark and rounded in the LIBERO-trained prediction. The WorldDojo-trained prediction retains more of its red surface."
      }
    },
    {
      "suite": "SC",
      "level": "L0",
      "model": "BWM · LIBERO Demo.",
      "sample": "SC000981",
      "frame": 103,
      "marker": {
        "x": 47,
        "y": 25,
        "label": "The predicted gripper sits lower in the camera view than the recorded gripper."
      },
      "reference": "worlddojo/compare/sim/sc000981-reference.webp",
      "prediction": "worlddojo/compare/sim/sc000981-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/sc000981-prediction.webp",
        "worlddojo": "worlddojo/compare/sim/sc000981-worlddojo.webp",
        "trainingNote": "Both predictions preserve the tabletop arrangement. The gripper sits higher in the WorldDojo-trained prediction."
      }
    },
    {
      "suite": "SC",
      "level": "L1",
      "model": "BWM · WorldDojo L0",
      "sample": "SC110106",
      "frame": 171,
      "marker": {
        "x": 62,
        "y": 57,
        "label": "The two mugs are separated farther front to back in the reference than in the prediction."
      },
      "reference": "worlddojo/compare/sim/sc110106-reference.webp",
      "prediction": "worlddojo/compare/sim/sc110106-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/sc110106-libero.webp",
        "worlddojo": "worlddojo/compare/sim/sc110106-prediction.webp",
        "trainingNote": "The LIBERO-trained model separates the mugs horizontally. Their silhouettes overlap in the WorldDojo-trained prediction."
      }
    },
    {
      "suite": "SC",
      "level": "L2",
      "model": "BWM · WorldDojo L0",
      "sample": "SC120001",
      "frame": 463,
      "marker": {
        "x": 52,
        "y": 62,
        "label": "The blue box remains to the right of the brown box in the prediction. In the reference it has moved to the lower left."
      },
      "reference": "worlddojo/compare/sim/sc120001-reference.webp",
      "prediction": "worlddojo/compare/sim/sc120001-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/sc120001-libero.webp",
        "worlddojo": "worlddojo/compare/sim/sc120001-prediction.webp",
        "trainingNote": "The two boxes are farther apart in the LIBERO-trained prediction and sit side by side in the WorldDojo-trained prediction."
      }
    },
    {
      "suite": "HM",
      "level": "L0",
      "model": "BWM · LIBERO Demo.",
      "sample": "HM000961",
      "frame": 176,
      "marker": {
        "x": 21,
        "y": 48,
        "label": "The small object remains on the table to the left of the barrier in the prediction."
      },
      "reference": "worlddojo/compare/sim/hm000961-reference.webp",
      "prediction": "worlddojo/compare/sim/hm000961-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/hm000961-prediction.webp",
        "worlddojo": "worlddojo/compare/sim/hm000961-worlddojo.webp",
        "trainingNote": "The small object stays left of the barrier in the LIBERO-trained prediction. It appears under the gripper behind the barrier in the WorldDojo-trained prediction."
      }
    },
    {
      "suite": "HM",
      "level": "L1",
      "model": "BWM · WorldDojo L0",
      "sample": "HM110001",
      "frame": 170,
      "marker": {
        "x": 76,
        "y": 44,
        "label": "A brown edge is visible to the right of the dark panel in the reference. It is hidden in the prediction."
      },
      "reference": "worlddojo/compare/sim/hm110001-reference.webp",
      "prediction": "worlddojo/compare/sim/hm110001-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/hm110001-libero.webp",
        "worlddojo": "worlddojo/compare/sim/hm110001-prediction.webp",
        "trainingNote": "The orange object remains visible to the left of both panels in the LIBERO-trained prediction. It is hidden in the WorldDojo-trained prediction."
      }
    },
    {
      "suite": "HM",
      "level": "L2",
      "model": "BWM · WorldDojo L0",
      "sample": "HM120003",
      "frame": 376,
      "marker": {
        "x": 49,
        "y": 85,
        "label": "The orange box reappears closer to the bowls in the prediction than in the reference."
      },
      "reference": "worlddojo/compare/sim/hm120003-reference.webp",
      "prediction": "worlddojo/compare/sim/hm120003-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/hm120003-libero.webp",
        "worlddojo": "worlddojo/compare/sim/hm120003-prediction.webp",
        "trainingNote": "The LIBERO-trained model shows a yellow cup both on the table and under the gripper. The WorldDojo-trained model shows only the cup on the table."
      }
    },
    {
      "suite": "CR",
      "level": "L0",
      "model": "BWM · WorldDojo L0",
      "sample": "CR000921",
      "frame": 141,
      "marker": {
        "x": 68,
        "y": 34,
        "label": "The cup rises with the gripper in the reference but stays on the table in the prediction."
      },
      "reference": "worlddojo/compare/sim/cr000921-reference.webp",
      "prediction": "worlddojo/compare/sim/cr000921-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/cr000921-libero.webp",
        "worlddojo": "worlddojo/compare/sim/cr000921-prediction.webp",
        "trainingNote": "Both predictions leave the red cup on the table while the recorded gripper lifts it."
      }
    },
    {
      "suite": "CR",
      "level": "L1",
      "model": "BWM · WorldDojo L0",
      "sample": "CR110455",
      "frame": 206,
      "marker": {
        "x": 27,
        "y": 90,
        "label": "The small colored box falls flat in the reference but remains upright beside the dark object in the prediction."
      },
      "reference": "worlddojo/compare/sim/cr110455-reference.webp",
      "prediction": "worlddojo/compare/sim/cr110455-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/cr110455-libero.webp",
        "worlddojo": "worlddojo/compare/sim/cr110455-prediction.webp",
        "trainingNote": "Both predictions keep the colored box upright beside the dark object. In the recording it has fallen flat."
      }
    },
    {
      "suite": "CR",
      "level": "L2",
      "model": "BWM · WorldDojo L0",
      "sample": "CR120004",
      "frame": 289,
      "marker": {
        "x": 44,
        "y": 65,
        "label": "The small packages reach the plate in the reference but remain on the black platform in the prediction."
      },
      "reference": "worlddojo/compare/sim/cr120004-reference.webp",
      "prediction": "worlddojo/compare/sim/cr120004-prediction.webp",
      "training": {
        "libero": "worlddojo/compare/sim/cr120004-libero.webp",
        "worlddojo": "worlddojo/compare/sim/cr120004-prediction.webp",
        "trainingNote": "The LIBERO-trained prediction clusters the blue packages over the black platform. The WorldDojo-trained prediction places them on opposite sides of the platform."
      }
    }
  ],
  "real": [
    {
      "suite": "SC",
      "level": "L0",
      "model": "BWM Basic1600 · 6k",
      "sample": "d6b4fec3a538c92e7835d96764297bed0f0a2bf58f8ef4dde4d2c60caf015566",
      "frame": 225,
      "task": "SC-L0-plate-cube",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/sc-l0-gt.webp",
      "prediction": "worlddojo/compare/real/sc-l0-pred.webp",
      "marker": {
        "x": 16,
        "y": 66,
        "label": "The prediction casts a dark gripper-shaped shadow across the left edge of the plate."
      }
    },
    {
      "suite": "SC",
      "level": "L1",
      "model": "BWM Basic1600 · 6k",
      "sample": "9fafaf49c838be94b2aaa6cf7a91c4f1c37fb31aef35bfaeb2a3b6cd6e54b357",
      "frame": 330,
      "task": "SC-L1-cube-plate",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/sc-l1-gt.webp",
      "prediction": "worlddojo/compare/real/sc-l1-pred.webp",
      "marker": {
        "x": 80,
        "y": 55,
        "label": "The blue plate appears farther down the table in the prediction."
      }
    },
    {
      "suite": "SC",
      "level": "L2",
      "model": "BWM Basic1600 · 6k",
      "sample": "6a66a5ba7ba5bb96b095705ed8c8eff1f76dde3e85266d3b4d6993f39742b7e0",
      "frame": 416,
      "task": "SC-L2-block",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/sc-l2-gt.webp",
      "prediction": "worlddojo/compare/real/sc-l2-pred.webp",
      "marker": {
        "x": 47,
        "y": 56,
        "label": "Three separate blocks in the recording appear as one blue shape in the prediction."
      }
    },
    {
      "suite": "OG",
      "level": "L0",
      "model": "BWM Basic1600 · 6k",
      "sample": "ce56c27fd1a48a3a5c2be894eecdb6161c8429a180200543f504f1b0dca60da1",
      "frame": 261,
      "task": "OG-L0-cube-stack",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/og-l0-gt.webp",
      "prediction": "worlddojo/compare/real/og-l0-pred.webp",
      "marker": {
        "x": 63,
        "y": 68,
        "label": "The blue block below the gripper loses its sharp corners in the prediction."
      }
    },
    {
      "suite": "OG",
      "level": "L1",
      "model": "BWM Basic1600 · 6k",
      "sample": "d45c1a99f85a9e9e69e46c98cd820fd7268457ee5423412da694d5aebaa42530",
      "frame": 299,
      "task": "OG-L1-New",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/og-l1-gt.webp",
      "prediction": "worlddojo/compare/real/og-l1-pred.webp",
      "marker": {
        "x": 46,
        "y": 38,
        "label": "The blue block beside the left gripper is missing in the prediction."
      }
    },
    {
      "suite": "OG",
      "level": "L2",
      "model": "BWM Basic1600 · 6k",
      "sample": "be00cc4cc16437fdb8c6820e7271ba907d0df7a3d16de020f61310a7dda1fbc1",
      "frame": 246,
      "task": "OG-L2-2-ball-cup-real",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/og-l2-gt.webp",
      "prediction": "worlddojo/compare/real/og-l2-pred.webp",
      "marker": {
        "x": 61,
        "y": 25,
        "label": "The green object held above the cup appears blue in the prediction."
      }
    },
    {
      "suite": "HM",
      "level": "L0",
      "model": "BWM Basic1600 · 6k",
      "sample": "1bf995ac7e3bdbc56ae0061a0fc16874918837d7581d759b69f3de9ee020d751",
      "frame": 539,
      "task": "HM-L0-hide-ball-cup",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/hm-l0-gt.webp",
      "prediction": "worlddojo/compare/real/hm-l0-pred.webp",
      "marker": {
        "x": 21,
        "y": 51,
        "label": "The large silver robot link occluding the left side is missing in the prediction."
      }
    },
    {
      "suite": "HM",
      "level": "L1",
      "model": "BWM Basic1600 · 6k",
      "sample": "589bdb0b7ec2f81a194f3eb03d2c836faeddaec8e4ea37d2f91282536e627aae",
      "frame": 548,
      "task": "HM-L1-ball-cup-cup",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/hm-l1-gt.webp",
      "prediction": "worlddojo/compare/real/hm-l1-pred.webp",
      "marker": {
        "x": 77,
        "y": 55,
        "label": "Two cups stand apart in the recording. The right-hand cup is missing in the prediction."
      }
    },
    {
      "suite": "HM",
      "level": "L2",
      "model": "BWM Basic1600 · 6k",
      "sample": "ea2905ddceea6cb7999dbcffbd5fd4698d0631de11ce23c9d7919cd01cbcce5f",
      "frame": 529,
      "task": "HM-L2-drawer-ball",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/hm-l2-gt.webp",
      "prediction": "worlddojo/compare/real/hm-l2-pred.webp",
      "marker": {
        "x": 50,
        "y": 61,
        "label": "The open drawer contains a blue ball in the recording and appears empty in the prediction."
      }
    },
    {
      "suite": "CR",
      "level": "L0",
      "model": "BWM Basic1600 · 6k",
      "sample": "abd517e0dc4f3066e1f0f7d16446f85a3056a84aeb9414dd1435994160c16294",
      "frame": 291,
      "task": "CR-L0-push-cup",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/cr-l0-gt.webp",
      "prediction": "worlddojo/compare/real/cr-l0-pred.webp",
      "marker": {
        "x": 40,
        "y": 43,
        "label": "The prediction puts a blue cup next to the left gripper. In the recording it is beside the right gripper."
      }
    },
    {
      "suite": "CR",
      "level": "L1",
      "model": "BWM Basic1600 · 6k",
      "sample": "741755b1dbc6b639556e6f1ea8103bb7202a928e692fef009e2b4e3b92dd4577",
      "frame": 346,
      "task": "CR-L1-ball_block_Collision",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/cr-l1-gt.webp",
      "prediction": "worlddojo/compare/real/cr-l1-pred.webp",
      "marker": {
        "x": 61,
        "y": 40,
        "label": "The recording shows a blue block behind the ball. The prediction shows only the ball."
      }
    },
    {
      "suite": "CR",
      "level": "L2",
      "model": "BWM Basic1600 · 6k",
      "sample": "77222c506e5d1f70ef087c1845aafb43a63f27eadcfc743040a36505af5e41db",
      "frame": 490,
      "task": "CR-L2-and-cup-drawer-11",
      "camera": "head",
      "fps": 25,
      "reference": "worlddojo/compare/real/cr-l2-gt.webp",
      "prediction": "worlddojo/compare/real/cr-l2-pred.webp",
      "marker": {
        "x": 58,
        "y": 88,
        "label": "The blue cup in front of the drawer is missing in the prediction."
      }
    }
  ]
};
