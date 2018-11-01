import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLifeWheel } from '../../actions/lifeWheelActions';
import Spinner from '../common/Spinner';
import Chart from 'chart.js';

class LifeWheel extends Component {
  componentDidMount() {
    this.props.getCurrentLifeWheel();

    const canvasElement = document.getElementById("lifeWheelChart");
    const radarChart = new Chart(canvasElement, {
      type: 'radar',
      data: {
        labels: ['ФІНАНСИ', 'ОТОЧЕННЯ', 'СІМ\'Я / ВІДНОСИНИ', 'ДУХОВНИЙ СТАН', 'ВІДПОЧИНОК / ПОДОРОЖІ / РОЗВАГИ', 'ЗДОРОВ\'Я', 'САМОРОЗВИТОК', 'БАЧЕННЯ ЖИТТЯ', 'ЧАС'],
        datasets: [{
          label: 'УСПІХ',
          backgroundColor: "rgba(8,171,137,0.2)",
          borderColor: "rgba(8,171,137,0.6)",
          radius: 5,
          pointRadius: 6,
          pointHoverRadius: 10,
          pointBackgroundColor: "rgba(8,171,137,0.6)",
          data: [8, 2, 9, 7, 2, 6, 8, 4, 3]
        }]
      },
      options: {
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 10,
            stepSize: 1
          },
          pointLabels: {
            fontSize: 14
          },
          legend: {
            position: 'left'
          },
          display: true
        }
      }
    });
  }

  render() {
    const { user } = this.props.auth;
    const { lifeWheel, loading } = this.props.lifeWheel;

    let content;

    const values = [
      {
        name: 'Finances',
        shortDescription: 'blablabla',
        fullDescription: (
          <div>
            <p>The theme includes a custom Webpack file, which can be used to quickly recompile and minify theme assets while developing or for deployment. You'll need to install
              <a href="https://nodejs.org/en/" target="_blank"> Node.js</a> before using Webpack. </p>
            <p className="mb-2">Once Node.js is installed, run <code>npm install</code> to install the rest of AppStack's dependencies. All dependencies will be downloaded to the
              <code> node_modules</code> directory.</p>
            <pre className="snippet">npm install</pre>
            <p className="mb-2">Now you're ready to modify the source files and generate new
              <code> dist/</code> files. AppStack is using webpack and webpack-serve to automatically detect file changes and start a local webserver at
              <code> http://localhost:8080</code>.</p>
            <pre className="snippet">npm start</pre>
          </div>
        )
      },
      {
        name: 'Surrounding / Оточення',
        shortDescription: 'Люди що тебе оточують',
        fullDescription: `На превеликий жаль чи то на щастя ми не вибираємо місце народження і свою сімю. Хтось може родитись в Індії в сімї бідного фермера
        а комусь може випасти бути сином Бостонського комерційного магната, і швидше за все кожен продовжить спосіб життя своїх батьків та свого найближчого оточення.
        Середовище визначає твій стериотип, стиль життя, бачення світу і думки. Ми проектуємо поведінку тих людей які кожного дня знаходяться біля нас і з ким ми спілкуємось,
        допустимий рівень життя і цінності в нас відповідні і що саме цікавіше - життєвий досвід та результати будуть приблизно подібні. Щоб досягнути чогось
        нового - потрібно помінятись і діяти по іншому, і найшвидше це буде зробити почавши спілкуватись з новими людьми а також. `    
      },
      {
        name: 'Family / Relations',
        shortDescription: 'Відносини з другою половинкою або сімєю загалом',
        fullDescription: (<div> Інтимні стосунки з другою половинкою це наші базові потреби, відносини дозволяють зняти стрес та переключитися від щоденних справ, сімя з іншої сторони
        це найближчі люди які тебе оточують і розділяють всі перемоги і незгоди а діти це велика радість. Оцініть наскільки ви задоволенні цією сферою вашого життя. <p/>
        А чи підтримують вас ваші близькі, чи можливо критикують і не розділяють ваших поглядів на життя?</div> )
      },
      {
        name: 'Spirit',
        shortDescription: 'Бажання віра та наполегливість, слабкі духом не досягнуть успіху.',
        fullDescription: `Наскільки ви сильні духом зробити ту чи іншу справу, перебороти всі труднощі та дійти до кінця? Рівень духу визначає наскільки сильно ви хочете чогось досягнути
        і чи зробите все що від вас залежить, чи кинете почате на пів шляху і вхопитесь за щось інше з тим же ж результатом? Силу волі також можна тренувати та розвивати, від цього залежить
        чи досягнете результату чи зійдете з дистанції.`
      },
      {
        name: 'Relax / Travel / Fun',
        shortDescription: 'Підзарядити батарейки, набратися сил, побачити світ та розширити світогляд!',
        fullDescription: `Будь-яка робота має мати перерву, бо людина виснажується, необхідно відпочити, перевести дух, набратися сил і вертатись до роботи. Це може бути як відпустка так і 
        будь-яка інша діяльність яка приносить задоволення. Подорожі також розвивають нашу свідомість та світогляд.`
      },
      {
        name: 'Health',
        shortDescription: 'Фізичне здоровя та спорт',
        fullDescription: `В здоровому тілі - здоровий дух, більшість людей нехтує цією сферою життя, але коли проявляються проблеми зі здоровям то всі інші справи відходять на другий план.
        Заняття спортом та ведення активного способу життя це ідеальний фундамент для успіху. Варто лише перебороти лінь.`
      },
      {
        name: 'Self Development',
        shortDescription: '',
        fullDescription: `Робота над собою з метою розвитку свідомості та розширення світогляду. У кожного з нас є багатий внутрішній світ який зазвичай далекий від реальності. Але себе 
        можна змінювати, міняти характер, звички, манеру поведінки та вирощувати нові якості що допоможуть нам стати на щабель вище у нас в голові.`
      },
      {
        name: 'Life Vision',
        shortDescription: ' ',
        fullDescription: `Глобальні мрії, плани на життя і бажання щось поміняти в кращу для себе сторону - чи є у вас це? Життя без мрії, без курсу стає сірим, одноманітним та нецікавим,
        сірі будені витягнуть весь ваш ентузіазм та креативність, згасає будь яка творчість та бажання щось робити. Знайдіть свій шлях в цьому житті і добийтеся успіху в поставлених цілях!`
      },
      {
        name: 'Time',
        shortDescription: 'Наскільки ваш час належить вам',
        fullDescription: (<div>Перегляньте свій розклад дня і визначіть наскільки ви задоволені витраченим часом, чи можете ви вільно ним розворяджатися, чи можете в любий момент встати і піти куди
        самі захочете? - скоріше за все ні, у вас є обовязки перед іншими людьми.<p/>Це дуже сильно нервує та обмежує наше життя. На секунду задумайтесь - майже половину активного життя ми працюємо на інших.
        5 днів на тиждень, 8 годин на день! Час - ваш основний життєвий ресурс, чи можете ви організувати своє життя таким чином щоб звільнити свій час на себе а не продавати його іншим на щоденній основі?</div>)
      }
    ];

    const valueCards = values.map(v => (
      <div className="col-12 col-md-6 col-lg-4" key={v.name}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{v.name}</h3>
            <h6 className="card-subtitle text-muted">{v.shortDescription}</h6>
          </div>
          <div className="card-body">{v.fullDescription}</div>
        </div>
      </div>

    ));

    if (lifeWheel === null || loading) {
      content = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(lifeWheel).length > 0) {
        content = (
          <div>
            Spirit:
            Every time we are up to create smth new, or start do what you think you want - you face internal resistance
            that makes you want everything else but not what you have to do. Unknown resistance forse. That it because of your habits and addictions.
            If you somehow can beat that deamon and repeat it every time - you will succeed in what you are doing.
            Need to learn to overcome that resistance. Цей опір придумав наш мозок, тому він його зможе і забрати, треба лише контролювати це.
            Ідеї приходять в основному несвідомо, їх треба зловити, і вже свідомо обміркувати та опрацювати.

            Кар'єра - на наш розсуд це не являється правильною цінністю, тому ми її упустили, суть карєри заключається лише у фінансовому збагаченні,
            в більшості випадків вона не є істинним бажанням людини, ми будуємо карєру лише тому, що підпавши під правила системи в якій ми живемо
            це очевидний вибір більшості - професійне навчання та робота по професії.

            {/* <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button> */}
          </div>
        );
      } else {
        // User is logged in but has no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">Life Wheel</h1>
          <div className='row'>
            <div className="card col-12">
              <div className="card-header">
                <h3 className="card-title">Сфери життя що визначають його якість.</h3>
                <h6 className="card-subtitle text-muted">Успіх в житті визначають всі його сфери а не лише одні гроші.</h6>
              </div>
              <div className="card-body">
                <canvas id="lifeWheelChart" className="col-12 mb-3"></canvas>
              </div>
            </div>
          </div>
          <div className='row'>
            {valueCards}
          </div>

          {/* {content} */}

        </div>
      </div>
    );
  }
}

LifeWheel.propTypes = {
  getCurrentLifeWheel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  lifeWheel: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lifeWheel: state.lifeWheel,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentLifeWheel })(
  LifeWheel
);
