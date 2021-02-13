import React, { useState } from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled, { css } from 'styled-components'
import { Layout, CenteredContainer, SubHeading, Footer } from '../components'

const Procrastinating = ({ location }) => {
  return (
    <Layout
      location={location}
      title="Step by step process to stop procrastinating"
      description={`This is a guided walkthrough of steps to overcome procrastination and stop procrastinating.`}
      keywords="procrastination, procrastinating, step by step, process, tool, overcome, stop"
    >
      <div>
        <CenteredContainer>
          <SubHeading>How to Stop Procrastinating</SubHeading>
          <div>
            <h4>Are you in bed?</h4>
            <div>
              <span style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  id="sleepy"
                  name="inBed"
                  value="sleepy"
                  checked
                />
                <label for="sleepy">Yes</label>
              </span>
              <span>
                <input type="radio" id="no" name="inBed" value="no" />
                <label for="no">No</label>
              </span>
            </div>
          </div>

          <div>
            <h4>Engine check: Are you feeling...</h4>
            <div>
              <span style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  id="sleepy"
                  name="engineCheck"
                  value="sleepy"
                  checked
                />
                <label for="sleepy">Sleepy?</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="hungry"
                  name="engineCheck"
                  value="hungry"
                />
                <label for="hungry">Hungry?</label>
              </span>
            </div>
          </div>

          <div>
            <h5>Take a nap then</h5>
          </div>
          <div>
            <h5>Go grab a snack</h5>
          </div>

          <div>
            <h4>Changing your physical state quickly is the key.</h4>
            <p>
              So jump out of bed (if you were in bed) or walk around for 2 mins
              (even if its in your room).
            </p>
          </div>

          <div>
            <h4>Staying hydrated is no joke.</h4>
            <p>Grab a big glass of water and scull it.</p>
          </div>

          <div>
            <h4>It's time to get that breathing in check. Navy seal style.</h4>
            <p>
              Box breathing - 4s inhale, 4s hold, 4s exhale, 4s hold. Repeat 4
              times.
            </p>
          </div>

          <div>
            <h4>Location, location, location.</h4>
            <p>
              Change up where you're at. Go to a cafe. Go to another room. Or
              even another corner of your room.
            </p>
          </div>

          <div>
            <h4>Checkpoint 🙌🏼 How are you feeling now?</h4>
            <div>
              <span style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  id="crap"
                  name="checkpoint"
                  value="crap"
                  checked
                />
                <label for="crap">Still feeling crap? 😒</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="letsgo"
                  name="checkpoint"
                  value="letsgo"
                />
                <label for="letsgo">Ready to push a lil bit more 👌🏼</label>
              </span>
            </div>
          </div>

          <div>
            <h5>Shower/shave/exercise 💪🏼</h5>
          </div>

          <div>
            <h4>🎉 Tada list time!</h4>
            <p>
              Write (or type) up a quick list of things that you've already done
              today. This will make you feel good - good enough to do more.
            </p>
            <textarea
              placeholder="woke up&#10;brushed my teeth&#10;showered&#10;etc."
            />
          </div>

          <div>
            <h4>☝🏼 1 more thing</h4>
            <p>
              If you could do just 1 more thing today, what would it be? Do that
              thing and then if you feel like it, do more. If not, then you're
              done for the day 👏🏼
            </p>
          </div>
          <Footer />
        </CenteredContainer>
      </div>
    </Layout>
  )
}

export default Procrastinating
