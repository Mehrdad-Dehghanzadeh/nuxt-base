<template>
  <article class="uikit-page" id="uikit-page">
    <h1 class="heading-1 text-center mb-30">UIKIT</h1>

    <!-- Typography -->
    <section class="card text-center">
      <h2 class="heading-3">typography</h2>
      <hr class="divider divider--light" />

      <div class="row">
        <div class="col">
          <h1 class="heading-1">heading-1</h1>
          <h2 class="heading-2">heading-2</h2>
          <h3 class="heading-3">heading-3</h3>
          <h4 class="heading-4">heading-4</h4>
          <h5 class="heading-5">heading-5</h5>
          <h6 class="heading-6">heading-6</h6>
        </div>

        <div class="col">
          <h5 class="subtitle-1">subtitle-1</h5>
          <h5 class="subtitle-2">subtitle-2</h5>
        </div>

        <div class="col">
          <p class="body-1">body-1</p>
          <p class="body-2">body-2</p>
          <p class="caption">caption</p>
          <p class="overline">overline</p>
        </div>
      </div>
    </section>
    <!-- Typography -->

    <!-- Dividers -->
    <section class="card mt-30 text-center">
      <h2 class="heading-3">divider</h2>

      <div class="row">
        <div class="col">
          <p class="subtitle">divider</p>
          <hr class="divider" />
        </div>

        <div class="col">
          <p class="subtitle">divider-dashed</p>
          <hr class="divider-dashed" />
        </div>

        <div class="col">
          <p class="subtitle">divider-dotted</p>
          <hr class="divider-dotted" />
        </div>
      </div>
    </section>
    <!-- Dividers -->

    <!-- Buttons -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">buttons</h2>

      <div class="mt-10">
        <k-btn size="xs" color="secondary" loading> xs </k-btn>
        <k-btn size="sm" color="primary" icon="plus"> sm </k-btn>
        <k-btn color="secondary" outline> md </k-btn>
        <k-btn size="lg" color="secondary" icon="plus" append ltr> lg </k-btn>
        <k-btn
          size="xl"
          color="primary"
          icon="plus"
          text="xl"
          ltr
          outline
          disabled
          loading
        />
      </div>
    </section>
    <!-- Buttons -->

    <!-- Inputs Elements -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">inputs Elements</h2>
      <k-form>
        <div class="row">
          <div class="col-xl-4 col-md-6 col-xs-12">
            <k-input label="normal" v-model="model.normal" required />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <k-input label="disabled" v-model="model.disabled" disabled />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <k-date-picker v-model="model.date" label="time picker" required />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <k-select
              v-model="model.select"
              label="select"
              :items="items"
              required
              clearable
            />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <k-select
              v-model="model.selectMultiple"
              label="Select Multiple"
              :items="items"
              required
              multiple
              clearable
            />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12" v-if="$auth.loggedIn()">
            <k-select-server
              v-model="model.selectServer"
              label="select Server"
              resource="people"
              item-text="firstName"
              action="read"
              multiple
              required
            />
          </div>

          <div class="col-xl-4 col-md-6 col-xs-12">
            <k-textarea
              v-model="model.textarea"
              label="textarea"
              required
              noResize
            />
          </div>
        </div>

        <div class="text-center mt-30">
          <k-btn type="submit">submit</k-btn>
        </div>
      </k-form>
    </section>
    <!-- Inputs Elements -->

    <!-- Modal Trigger -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">modal</h2>

      <k-btn size="xs" color="primary" @click="modal.normal = true">
        modal
      </k-btn>
      <k-btn size="xs" color="primary" @click="modal.lg = true" outline>
        lg modal
      </k-btn>
      <k-btn size="xs" color="primary" @click="modal.full = true">
        xs modal
      </k-btn>
    </section>
    <!-- Modal Trigger -->

    <!-- Menus -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">menu</h2>

      <div class="row">
        <div class="col">
          <p>light</p>
          <k-menu light>
            <k-menu-item> item-1 </k-menu-item>

            <k-menu-item> item-2 </k-menu-item>
          </k-menu>
        </div>

        <div class="col">
          <p>normal</p>
          <k-menu>
            <k-menu-item> item-1 </k-menu-item>

            <k-menu-item> item-2 </k-menu-item>
          </k-menu>
        </div>
      </div>
    </section>
    <!-- Menus -->

    <!-- Snackbars -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">snackbar</h2>

      <div class="mt-30">
        <k-btn @click="$snack.error('خطا')" color="red" outline> error </k-btn>
        <k-btn @click="$snack.success('قبول')" color="success" outline>
          success
        </k-btn>
        <k-btn @click="$snack.info('اطلاع')" color="info" outline> info </k-btn>
        <k-btn @click="$snack.alert('اخطار')" color="alert" outline>
          alert
        </k-btn>
      </div>
    </section>
    <!-- Snackbars -->

    <!-- Data Table -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">Data Table</h2>
      <k-data-table :headers="headers" :data="data" paging centered>
        <template v-slot:actions="{ item }">
          <k-menu>
            <k-menu-item>{{ item.name }}</k-menu-item>
          </k-menu>
        </template>
      </k-data-table>
    </section>
    <!-- Data Table -->

    <!-- Chips -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">Chip</h2>
      <k-chip clearable>normal and clearable</k-chip>
      <k-chip color="alert">alert</k-chip>
      <k-chip color="error">error</k-chip>
      <k-chip color="error" outline>outline error</k-chip>

      <k-chip color="success" clearable>success</k-chip>
      <k-chip color="info">info</k-chip>
      <k-chip color="info" copy>text</k-chip>
    </section>
    <!-- Chips -->

    <!-- Tabs -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">Tabs</h2>

      <k-tab :tabs="['tab #1', 'tab #2', { title: 'سی پی یو', icon: 'cpu' }]">
        <template v-slot:tab-1="{ tab }">{{ `test: ${tab}` }}</template>
        <k-tab-item>
          tab #1
          asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</k-tab-item
        >
        <k-tab-item>
          tab #2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </k-tab-item>

        <k-tab-item>
          سی پی یو Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </k-tab-item>
      </k-tab>
    </section>
    <!-- Tabs -->

    <!-- Steppers -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">Steppers</h2>

      <k-stepper v-model="stepper" nav navigating>
        <k-stepper-step title="step 1">
          <h3 class="text-center">step 1</h3>
        </k-stepper-step>

        <k-stepper-step title="step 2">
          <h3 class="text-center">step 2</h3>
        </k-stepper-step>

        <k-stepper-step title="step 3">
          <h3 class="text-center">step 3</h3>
        </k-stepper-step>

        <k-stepper-step title="step 4">
          <h3 class="text-center">step 4</h3>
        </k-stepper-step>
      </k-stepper>
    </section>
    <!-- Steppers -->

    <!-- Alert -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">Alerts</h2>

      <k-alert v-model="alert.a">
        <slot> متن تستی </slot>
      </k-alert>
      <k-btn @click="alert.a = true">Alert A</k-btn>

      <k-alert v-model="alert.success" title="موفق" :handler="handler" success>
        <p>سلام بر دنیا</p>
      </k-alert>
      <k-btn @click="alert.success = true">Alert Success</k-btn>
    </section>
    <!-- Alert -->

    <!-- Info -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">Info</h2>
      <k-info title="عنوان" text="this is test text" icon="check-circle" />
    </section>
    <!-- Info -->

    <!-- KProgress -->
    <section class="card mt-30">
      <h2 class="heading-3 text-center">Progress</h2>
      <div class="my-20">
        <h3 class="heading-6 text-center">determinate</h3>
        <k-progress type="determinate" />
      </div>

      <div class="my-20">
        <h3 class="heading-6 text-center">linear</h3>
        <k-progress v-model="progress" />
      </div>
    </section>
    <!-- KProgress -->

    <!-- Modals -->
    <k-modal v-model="modal.normal" />
    <k-modal v-model="modal.lg" size="lg">
      <h3 class="heading-5 k-modal__title" slot="header">lg modal</h3>

      <div class="text-center">
        <p>modal content</p>
      </div>
    </k-modal>

    <k-modal v-model="modal.full" size="xs" title="xs modal">
      <div class="text-center">
        <p>modal content</p>
      </div>
    </k-modal>
    <!-- Modals -->
  </article>
</template>

<script>
export default {
  name: 'UikitPage',

  layout: 'full',

  data() {
    return {
      model: {
        normal: '',
        date: '',
        disabled: 'disabled',
        select: '',
        selectMultiple: [],
        selectServer: [],
        textarea: ''
      },
      modal: {
        normal: false,
        lg: false,
        full: false
      },
      items: [
        { title: 'item1', id: '1' },
        { title: 'item2', id: '2' },
        { title: 'item3', id: '3' }
      ],

      headers: [
        { title: 'title 1', value: 'name' },
        { title: 'title 2', value: 'lastName' },
        { title: 'title 3', value: 'age' },
        { title: 'actions', value: 'actions' }
      ],

      data: [
        { name: 'mehrdad', lastName: 'deghan', age: 21 },
        { name: 'deghan', lastName: 'deghan', age: 23 },
        { name: 'mehrdad', lastName: 'mehrdad', age: 32 }
      ],

      stepper: 2,

      alert: {
        a: false,
        success: false
      },

      progress: 55
    }
  },

  methods: {
    handler() {
      console.log('handler is done')
    }
  }
}
</script>
