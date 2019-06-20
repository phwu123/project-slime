const classesChosen =  {
    t1: {
      Fighter: false,
      Scout: false,
      Elementalist: false,
      Cleric: false
    },
    t2: {}
}

const classSkills = {
  Fighter: {
    w1: {
      wo1: {
        1: false,
        2: false,
        3: false
      },
      wc1: {
        1: false,
        2: false
      },
      wf1: {
        1: false,
        2: false
      },
    },
    w2: {
      wo2: {
        1: false,
        2: false
      },
      wc2: {
        1: false,
        2: false
      },
      wf2: {
        1: false,
        2: false,
        3: false
      },
    },
    u1: {
      1: false,
      2: false
    },
    p1: {
      1: false,
      2: false,
      3: false
    }
  },
  Scout: {
    w1: {
      wo1: {
        1: false,
        2: false,
        3: false
      },
      wc1: {
        1: false,
        2: false
      },
      wf1: {
        1: false,
        2: false
      }
    },
    w2: {
      wo2: {
        1: false,
        2: false
      },
      wc2: {
        1: false,
        2: false
      },
      wf2: {
        1: false,
        2: false,
        3: false
      }
    },
    u1: {
      1: false,
      2: false
    },
    p1: {
      1: false,
      2: false,
      3: false
    }
  },
  Elementalist: {
    'm1-fire': {
      mq1: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      ms1: {
        1: false,
        2: false,
        3: false,
        4: false
      }
    },
    'm2-fire': {
      mq2: {
        1: false,
        2: false
      },
      ms2: {
        1: false,
        2: false
      }
    },
    'm1-ice': {
      mq1: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      ms1: {
        1: false,
        2: false,
        3: false,
        4: false
      }
    },
    'm2-ice': {
      mq2: {
        1: false,
        2: false
      },
      ms2: {
        1: false,
        2: false
      }
    },
    'm1-wind': {
      mq1: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      ms1: {
        1: false,
        2: false,
        3: false,
        4: false
      }
    },
    'm2-wind': {
      mq2: {
        1: false,
        2: false
      },
      ms2: {
        1: false,
        2: false
      }
    },
    'm1-earth': {
      mq1: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      ms1: {
        1: false,
        2: false,
        3: false,
        4: false
      }
    },
    'm2-earth': {
      mq2: {
        1: false,
        2: false
      },
      ms2: {
        1: false,
        2: false
      }
    },
    u1: {
      1: false,
      2: false
    },
    u2: {
      1: false,
      2: false
    },
    p1: {
      1: false,
      2: false
    },
    p2: {
      1: false,
      2: false
    }
  },
  Cleric: {
    w1: {
      wo1: {
        1: false,
        2: false,
        3: false
      },
      wc1: {
        1: false,
        2: false
      },
      wf1: {
        1: false,
        2: false,
        3: false
      },
    },
    'm1-holy': {
      mq1: {
        1: false,
        2: false
      },
      ms1: {
        1: false,
        2: false
      }
    },
    'm2-holy': {
      mq2: {
        1: false,
        2: false
      }
    },
    u1: {
      1: false,
      2: false
    },
    u2: {
      1: false,
      2: false
    },
    p1: {
      1: false,
      2: false
    }
  }
}

export { classesChosen, classSkills }
