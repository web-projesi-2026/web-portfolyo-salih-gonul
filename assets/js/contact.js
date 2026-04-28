/* ============================================================
   contact.js — İletişim Formu Doğrulama (Validation) Mantığı
   ============================================================ */

(function () {
  'use strict';

  /* ---------- YARDIMCI FONKSİYONLAR ---------- */

  /**
   * E-posta formatını RFC 5322 benzeri regex ile doğrular.
   * @param {string} value
   * @returns {boolean}
   */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }

  /**
   * Belirtilen form grubunu hatalı olarak işaretler.
   * @param {HTMLElement} group
   * @param {string} message
   */
  function setError(group, message) {
    group.classList.remove('is-valid');
    group.classList.add('is-error');
    var errorEl = group.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message;
  }

  /**
   * Belirtilen form grubunu geçerli olarak işaretler.
   * @param {HTMLElement} group
   */
  function setValid(group) {
    group.classList.remove('is-error');
    group.classList.add('is-valid');
    var errorEl = group.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
  }

  /**
   * Belirtilen form grubunun durumunu sıfırlar.
   * @param {HTMLElement} group
   */
  function clearState(group) {
    group.classList.remove('is-error', 'is-valid');
    var errorEl = group.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
  }

  /* ---------- ALAN DOĞRULAMA KURALLARI ---------- */

  /**
   * Tek bir alanı doğrular; hata varsa setError, yoksa setValid çağırır.
   * @param {string} fieldId
   * @returns {boolean} Geçerliyse true
   */
  function validateField(fieldId) {
    var field = document.getElementById(fieldId);
    if (!field) return true;

    var group = document.getElementById('group-' + fieldId);
    var value = field.value;

    switch (fieldId) {

      case 'name':
        if (!value.trim()) {
          setError(group, 'Ad soyad alanı boş bırakılamaz.');
          return false;
        }
        if (value.trim().length < 2) {
          setError(group, 'Ad soyad en az 2 karakter olmalıdır.');
          return false;
        }
        setValid(group);
        return true;

      case 'email':
        if (!value.trim()) {
          setError(group, 'E-posta adresi boş bırakılamaz.');
          return false;
        }
        if (!isValidEmail(value)) {
          setError(group, 'Lütfen geçerli bir e-posta adresi giriniz. (ör. ad@site.com)');
          return false;
        }
        setValid(group);
        return true;

      case 'subject':
        if (!value) {
          setError(group, 'Lütfen bir konu seçiniz.');
          return false;
        }
        setValid(group);
        return true;

      case 'message':
        if (!value.trim()) {
          setError(group, 'Mesaj alanı boş bırakılamaz.');
          return false;
        }
        if (value.trim().length < 10) {
          setError(group, 'Mesajınız en az 10 karakter olmalıdır.');
          return false;
        }
        setValid(group);
        return true;

      case 'kvkk':
        if (!field.checked) {
          setError(group, 'Devam etmek için onay vermeniz gerekmektedir.');
          return false;
        }
        setValid(group);
        return true;

      default:
        return true;
    }
  }

  /* ---------- CANLI DOĞRULAMA (blur & input) ---------- */

  function attachLiveValidation(fieldId) {
    var field = document.getElementById(fieldId);
    if (!field) return;

    var group  = document.getElementById('group-' + fieldId);
    var events = field.type === 'checkbox' ? ['change'] : ['blur', 'input'];

    events.forEach(function (evt) {
      field.addEventListener(evt, function () {
        // Sadece kullanıcı alanı bıraktıktan / değiştirdikten sonra doğrula
        if (evt === 'input' && !group.classList.contains('is-error')) return;
        validateField(fieldId);
      });
    });
  }

  /* ---------- KARAKTER SAYACI ---------- */

  function initCharCounter() {
    var textarea  = document.getElementById('message');
    var counter   = document.getElementById('charCount');
    if (!textarea || !counter) return;

    textarea.addEventListener('input', function () {
      var len = textarea.value.length;
      counter.textContent = len;
      counter.style.color = len > 900 ? '#f87171' : '';
    });
  }

  /* ---------- FORM GÖNDERİMİ ---------- */

  function initForm() {
    var form        = document.getElementById('contactForm');
    var submitBtn   = document.getElementById('submitBtn');
    var successMsg  = document.getElementById('successMessage');
    var resetBtn    = document.getElementById('resetFormBtn');

    if (!form) return;

    var fields = ['name', 'email', 'subject', 'message', 'kvkk'];

    // Canlı doğrulama bağla
    fields.forEach(attachLiveValidation);

    // Karakter sayacı
    initCharCounter();

    // Form submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Tüm alanları doğrula
      var allValid = fields.reduce(function (acc, id) {
        return validateField(id) && acc;
      }, true);

      if (!allValid) {
        // İlk hatalı alana scroll/focus
        var firstError = form.querySelector('.is-error input, .is-error select, .is-error textarea');
        if (firstError) firstError.focus();
        return;
      }

      // Gönderme simülasyonu (loading state)
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Backend entegrasyonu olmadığından 1.5 sn gecikme ile başarı göster
      setTimeout(function () {
        submitBtn.classList.remove('loading');

        // Formu gizle, başarı mesajını göster
        form.style.display = 'none';
        if (successMsg) {
          successMsg.hidden  = false;
          successMsg.focus && successMsg.setAttribute('tabindex', '-1');
        }

        // Console'a form verilerini yaz (geliştirici notu)
        var formData = {
          name   : document.getElementById('name').value.trim(),
          email  : document.getElementById('email').value.trim(),
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value.trim(),
        };
        console.log('[ContactForm] Gönderilen veriler:', formData);
      }, 1500);
    });

    // Formu sıfırla butonu
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        form.reset();
        fields.forEach(function (id) {
          var group = document.getElementById('group-' + id);
          if (group) clearState(group);
        });
        var counter = document.getElementById('charCount');
        if (counter) counter.textContent = '0';

        form.style.display    = '';
        submitBtn.disabled    = false;
        if (successMsg) successMsg.hidden = true;

        // Ad alanına odaklan
        var nameField = document.getElementById('name');
        if (nameField) nameField.focus();
      });
    }
  }

  /* ---------- BAŞLAT ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }

})();
