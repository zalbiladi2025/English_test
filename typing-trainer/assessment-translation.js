// Arabic translation for comprehensive-test assessment criteria.
(() => {
  function applyAssessmentTranslation() {
    const rules = document.querySelector('#comprehensiveTestView .test-rules');
    if (rules) {
      rules.innerHTML = `
        <strong>Assessment rule | معيار التقييم</strong>
        <p><strong>English:</strong> Test duration: 10 minutes. Accuracy = 60% of the grade. Speed = 40% of the grade. 40 WPM earns the full speed score.</p>
        <div dir="rtl" lang="ar" style="margin-top:12px;padding:14px 16px;border-radius:14px;background:#f8fafc;line-height:1.9;text-align:right">
          <strong>بالعربية:</strong>
          <div>مدة الاختبار: <strong>10 دقائق</strong>.</div>
          <div>الدقة (Accuracy): <strong>6 درجات من 10</strong>، وتمثل 60% من الدرجة النهائية.</div>
          <div>السرعة (Speed): <strong>4 درجات من 10</strong>، وتمثل 40% من الدرجة النهائية.</div>
          <div>عند الوصول إلى سرعة <strong>40 كلمة في الدقيقة (WPM)</strong> أو أكثر، يحصل المتدرب على الدرجة الكاملة للسرعة وهي 4/4.</div>
          <div>كلما ارتفعت الدقة والسرعة ارتفعت الدرجة النهائية، والحد الأعلى هو <strong>10/10</strong>.</div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0">
          <strong>Grade levels | مستويات التقدير</strong>
          <div dir="rtl" lang="ar" style="margin-top:8px;line-height:1.9;text-align:right">
            9.0–10 = ممتاز (Excellent)<br>
            8.0–8.9 = جيد جدًا (Very Good)<br>
            7.0–7.9 = جيد (Good)<br>
            6.0–6.9 = مقبول (Satisfactory)<br>
            أقل من 6 = يحتاج إلى تدريب إضافي (Needs Practice)
          </div>
        </div>`;
    }

    const accuracyLabel = document.querySelector('#comprehensiveTestResultView #testAccuracyPoints + span');
    if (accuracyLabel) accuracyLabel.textContent = 'Accuracy points /6 • درجة الدقة';
    const speedLabel = document.querySelector('#comprehensiveTestResultView #testSpeedPoints + span');
    if (speedLabel) speedLabel.textContent = 'Speed points /4 • درجة السرعة';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(applyAssessmentTranslation, 0));
  } else {
    setTimeout(applyAssessmentTranslation, 0);
  }
})();
