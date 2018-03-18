FROM python:2.7-wheezy

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY requirements.txt ./

RUN pip install -r requirements.txt

# Bundle app source
COPY . .

RUN touch config.yaml

CMD [ "python", "csgo_twitch_picks_guns.py" ]
