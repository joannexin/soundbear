require('babel-register')({
        "presets": ["stage-0", "es2015"]
});

const should = require('should');
const request = require('supertest');
const server = request.agent('http://localhost:8080');
const app = require('../../server');
const agent = request.agent(app);

describe('Requesting audio data', () => {
  beforeEach((done) => {
    done();
  });

   describe('Spotify', () => {
    it('should respond with artis\'s id', (done) => {
      server.post('/getSongs')
      .send({
        string: 'adele hello'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
             //console.log('hello spec', res.body.tracks.items[0].artists[0].id)
        res.body.tracks.items[0].artists[0].id.should.be.type('string');
        done();
      });
    });
  });

  describe('Top Tracks', () => {
    it('should respond with array of songs', (done) => {
      server.post('/artistTracks')
      .send({
        string: 'muse hysteria'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.tracks.should.be.instanceOf(Array);
        done();
      });
    });
  });

  describe('Artist\'s Albums', () => {
    it('should respond with array of albums', (done) => {
      server.post('/artistAlbums')
      .send({
        string: 'arctic monkeys r u mine'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        res.body.items.should.be.instanceOf(Array);
        done();
      });
    });
  });

  describe('Related Artists', () => {
    it('should respond with array of related artists', (done) => {
      server.post('/artistsTree')
      .send({
        artistId: '4dpARuHxo51G3z768sgnrY',
        excludeList: ['2FXC3k01G6Gw61bmprjgqS']
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body[0].popularity.should.be.a.Number;
        done();
      });
    });
  });

  describe('Artist Info', () => {
    it('should respond with object containing artist info', (done) => {
      server.post('/artistInfo')
      .send({
        id: '4dpARuHxo51G3z768sgnrY'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.images.should.be.an.instanceOf(Array);
        done();
      });
    });
  });

  describe('Album Info', () => {
    it('should respond with object containing album info', (done) => {
      server.post('/albumInfo')
      .send({
        id: '0sNOF9WDwhWunNAHPD3Baj'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.albums[0].album_type.should.be.type('string');
        done();
      });
    });
  });


  describe('Lyrics', () => {
    it('should respond with array of related artists', (done) => {
      server.post('/lyrics')
      .send({
        artist: 'radiohead',
        track: 'karma police'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.should.be.a.String;
        done();
      });
    });
  });

});